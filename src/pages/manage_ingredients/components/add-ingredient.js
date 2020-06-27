import * as React from 'react';
import { Modal, Alert } from 'antd';
import IngredientInfo from './ingredient-info';
import { Ingredient } from 'obiman-data-models';
import Network from '../../../utils/network';
import { INGREDIENTS_API_URL } from '../../../constants/endpoints';
import {
  INGREDIENT_ADDED_SUCCESSFULLY_MESSAGE,
  ADD_MODAL_HEADER
} from '../../../constants/manage-ingredients';
import { ADD_BUTTON_TEXT } from '../../../constants/app';

const INITIAL_STATE = {
  loading: false,
  successMessage: '',
  errorMessage: '',
  ingredientToCreate: {},
  showValidationErrors: false
}

export default class AddIngredient extends React.Component {
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

  onChange = ingredientToCreate => this.setState({ ingredientToCreate });

  addIngredient = async () => {
    const { businessId } = this.props;
    const ingredient = new Ingredient(this.state.ingredientToCreate);
    if (Object.keys(ingredient.validate()).length) {
      this.setState({ showValidationErrors: true });
    } else {
      const ingredientData = ingredient.get();
      this.setState({ loading: true, errorMessage: '', successMessage: '' });
      try {
        await Network.post(INGREDIENTS_API_URL(businessId), ingredientData);
        this.setState({ errorMessage: '', successMessage: INGREDIENT_ADDED_SUCCESSFULLY_MESSAGE(ingredientData.label) });
        setTimeout(() => {
          this.props.fetchAllIngredients(businessId);
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
    onOk={this.addIngredient}
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
    <IngredientInfo
      currency={this.props.currency}
      locations={this.props.locations}
      ingredient={this.state.ingredientToCreate}
      showValidationErrors={this.state.showValidationErrors}
      onChange={this.onChange}
    />
    {this.state.errorMessage ? <Alert message='Oops!' description={this.state.errorMessage} type='error' showIcon /> : null}
    {this.state.successMessage ? <Alert message='Yay!' description={this.state.successMessage} type='success' showIcon /> : null}
  </Modal>;
}