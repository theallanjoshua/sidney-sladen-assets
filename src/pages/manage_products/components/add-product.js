import * as React from 'react';
import { Modal, Alert } from 'antd';
import ProductInfo from './product-info';
import { Product } from 'obiman-data-models';
import Network from '../../../utils/network';
import { PRODUCTS_API_URL } from '../../../constants/endpoints';
import {
  PRODUCT_ADDED_SUCCESSFULLY_MESSAGE,
  ADD_MODAL_HEADER
} from '../../../constants/manage-products';
import { ADD_BUTTON_TEXT } from '../../../constants/app';

const INITIAL_STATE = {
  loading: false,
  successMessage: '',
  errorMessage: '',
  productToCreate: {},
  showValidationErrors: false
}

export default class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE
    }
  }
  componentDidUpdate = prevProps => {
    const { visible: prevVisible } = { ...prevProps };
    const { visible } = { ...this.props };
    if (!prevVisible && visible) {
      this.setState({ ...INITIAL_STATE });
    }
  }
  onChange = productToCreate => this.setState({ productToCreate });
  addProduct = async () => {
    const { businessId } = this.props;
    const product = new Product(this.state.productToCreate);
    if (Object.keys(product.validate()).length) {
      this.setState({ showValidationErrors: true });
    } else {
      const productData = product.get();
      this.setState({ loading: true, errorMessage: '', successMessage: '' });
      try {
        await Network.post(PRODUCTS_API_URL(businessId), productData);
        this.setState({ errorMessage: '', successMessage: PRODUCT_ADDED_SUCCESSFULLY_MESSAGE(productData.label) });
        setTimeout(() => {
          this.props.fetchAllProducts(businessId);
          this.props.hideModal();
        }, 2000);
      } catch (errorMessage) {
        this.setState({ errorMessage });
      }
      this.setState({ loading: false });
    }
  }
  render = () => <Modal
    destroyOnClose
    maskClosable={false}
    title={ADD_MODAL_HEADER}
    okText={ADD_BUTTON_TEXT}
    style={{ maxWidth: '90vw' }}
    width={'720px'}
    visible={this.props.visible}
    closable={!this.state.loading}
    onOk={this.addProduct}
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
    <ProductInfo
      currency={this.props.currency}
      classifications={this.props.classifications}
      taxes={this.props.taxes}
      ingredients={this.props.ingredients}
      product={this.state.productToCreate}
      showValidationErrors={this.state.showValidationErrors}
      onChange={this.onChange}
    />
    {this.state.errorMessage ? <Alert message='Oops!' description={this.state.errorMessage} type='error' showIcon /> : null}
    {this.state.successMessage ? <Alert message='Yay!' description={this.state.successMessage} type='success' showIcon /> : null}
  </Modal>;
}