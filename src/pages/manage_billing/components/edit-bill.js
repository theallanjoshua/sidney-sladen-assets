import * as React from 'react';
import { Alert, Spin, Modal, Typography } from 'antd';
import BillInfo from './bill-info';
import { Bill, Utils } from 'obiman-data-models';
import {
  BILL_EDITED_SUCCESSFULLY_MESSAGE,
  EDIT_BILL_PAGE_TITLE
} from '../../../constants/manage-billing';
import { SAVE_BUTTON_TEXT } from '../../../constants/app';
import { getEnrichedProducts } from '../../../utils/products';
import AuditTrail from '../../../components/audit-trail';

const { Text } = Typography;

const INITIAL_STATE = {
  loading: false,
  successMessage: '',
  errorMessage: '',
  ingredients: [],
  products: [],
  billToUpdate: {},
  showValidationErrors: false
}

export default class EditBill extends React.Component {
  constructor(props) {
    super(props);
    const { ingredients, products } = props;
    this.state = {
      ...INITIAL_STATE,
      ingredients,
      products
    };
  }
  componentDidUpdate = prevProps => {
    const { visible: prevVisible } = prevProps;
    const { visible, ingredients, products, billToUpdate } = this.props;
    if (!prevVisible && visible) {
      this.setState({ ...INITIAL_STATE, ingredients, products, billToUpdate });
    }
  }
  getIngredients = () => {
    const { billToUpdate, ingredients, products } = this.state;
    const { composition = [] } = billToUpdate;
    const newComposition = composition
      .filter(({ orderId }) => !orderId)
      .reduce((acc, { id: productId }) => {
        const { composition = [] } = products.filter(({ id }) => id === productId)[0] || {};
        return [ ...acc, ...composition ];
      }, []);
    const ingredientsToUpdate = new Utils().getIngredientsToUpdate(ingredients, newComposition);
    return ingredients.map(ingredient => {
      const ingredientToUpdate = ingredientsToUpdate.filter(({ id }) => id === ingredient.id)[0];
      return { ...(ingredientToUpdate || ingredient) }
    })
  }

  getProducts = () => {
    const { products } = this.state;
    return getEnrichedProducts(products, this.getIngredients());
  }
  onChange = billToUpdate => this.setState({ billToUpdate });
  onSave = async () => {
    const bill = new Bill(this.state.billToUpdate);
    if (Object.keys(bill.validate()).length) {
      this.setState({ showValidationErrors: true });
    } else {
      this.setState({ loading: true, errorMessage: '', successMessage: '' });
      try {
        const billData = bill.get();
        await this.props.onSave(billData);
        this.setState({ errorMessage: '', successMessage: BILL_EDITED_SUCCESSFULLY_MESSAGE });
      } catch (errorMessage) {
        this.setState({ errorMessage });
      }
      this.setState({ loading: false });
    }
  }
  render = () => <Modal
    destroyOnClose
    maskClosable={false}
    title={<div>
      {EDIT_BILL_PAGE_TITLE}
      <br />
      <Text type='secondary' style={{ fontSize: 'x-small' }}>
        <AuditTrail
          prefixText={'Created'}
          date={this.state.billToUpdate.createdDate}
          user={this.state.billToUpdate.createdBy}
        />
      </Text>
      {this.state.billToUpdate.updatedDate !== this.state.billToUpdate.createdDate ?
        <Text type='secondary' style={{ fontSize: 'x-small' }}>
          <AuditTrail
            prefixText={'Last edited'}
            date={this.state.billToUpdate.updatedDate}
            user={this.state.billToUpdate.updatedBy}
          />
        </Text>
      : null}
    </div>}
    okText={SAVE_BUTTON_TEXT}
    style={{ maxWidth: '90vw' }}
    width={'720px'}
    visible={this.props.visible}
    closable={!this.state.loading}
    onOk={this.onSave}
    okButtonProps={{
      disabled: !!this.state.successMessage,
      loading: this.state.loading
    }}
    onCancel={this.props.hideModal}
    cancelButtonProps={{
      disabled: this.state.loading
    }}
  >
    {this.state.errorMessage ? <Alert message='Oops!' description={this.state.errorMessage} type='error' showIcon /> : null}
    {this.state.successMessage ? <Alert message='Yay!' description={this.state.successMessage} type='success' showIcon /> : null}
    {this.state.successMessage || this.state.errorMessage ? <br /> : null}
    <Spin spinning={this.state.loading}>
      <BillInfo
        showValidationErrors={this.state.showValidationErrors}
        bill={this.state.billToUpdate}
        ingredients={this.getIngredients()}
        products={this.getProducts()}
        onChange={this.onChange}
        orders={this.props.orders}
        currency={this.props.currency}
        sources={this.props.sources}
        isCustomerView={this.props.isCustomerView}
      />
    </Spin>
    {this.state.errorMessage ? <Alert message='Oops!' description={this.state.errorMessage} type='error' showIcon /> : null}
    {this.state.successMessage ? <Alert message='Yay!' description={this.state.successMessage} type='success' showIcon /> : null}
  </Modal>;
}