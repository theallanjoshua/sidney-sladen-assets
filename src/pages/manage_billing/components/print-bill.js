import * as React from 'react';
import { Modal, Button, Typography, Icon } from 'antd';
import BillCompositionReadonly from './bill-composition-readonly';
import BillTotal from './bill-total';
import ReactToPrint from 'react-to-print';
import S3ToImage from '../../../components/s3-to-image';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../constants/app';
import { Bill } from 'obiman-data-models';

const { Title, Paragraph, Text } = Typography;

export default class PrintBill extends React.Component {
  render = () => {
    const bill = new Bill(this.props.billToPrint);
    const billData = bill.get();
    return <Modal
        destroyOnClose
        style={{ maxWidth: '90vw' }}
        width={'720px'}
        visible={this.props.visible}
        onCancel={this.props.hideModal}
        footer={<div className='right-align'>
          <Button
            children={'Cancel'}
            onClick={this.props.hideModal}
          />
          <ReactToPrint
            trigger={() => <Button
              type='primary'
              icon='printer'
              children={'Print'}
            />}
            content={() => this.billRef}
          />
        </div>}
      >
        <div ref={billRef => this.billRef = billRef}>
          <div  className='flex-column center-align'>
            {this.props.currentBusiness.logo ? <S3ToImage
              alt={this.props.currentBusiness.label}
              s3Key={this.props.currentBusiness.logo}
            /> : null}
            <Title>{this.props.currentBusiness.label || billData.businessLabel}</Title>
            {this.props.currentBusiness.address ? <div className='baseline-align'>
              <Icon type='home' style={{ paddingRight: '8px' }} />
              <Paragraph>{this.props.currentBusiness.address}</Paragraph>
            </div> : null}
            <div className='space-between flex-wrap'>
              {(this.props.currentBusiness.contacts || []).map(({ type, info }) => <div key={type}>
                <Icon type={type} style={{ paddingRight: '8px' }} />
                <Text style={{ paddingRight: '20px' }}>{info}</Text>
              </div>)}
            </div>
          </div>
          <br />
          <div className='space-between flex-wrap'>
            <div className='flex-column'>
              <Text>
                <Text strong>Order ID: </Text>
                {billData.id}
              </Text>
              <Text>
                <Text strong>Customer info: </Text>
                {billData.customer}
              </Text>
            </div>
            <div className='flex-column'>
              <Text>
                <Text strong>Date: </Text>
                {moment(Number(billData.createdDate)).format(DATE_TIME_FORMAT)}
              </Text>
              <Text>
                <Text strong>Duration: </Text>
                {moment.duration(moment(Number(billData.updatedDate || Date.now())).diff(Number(billData.createdDate))).humanize()}
              </Text>
              </div>
          </div>
          <br />
          <BillCompositionReadonly
            composition={bill.getGroupedComposition()}
            currency={this.props.currentBusiness.currency || billData.currency}
          />
          <BillTotal
            bill={billData}
            currency={this.props.currentBusiness.currency || billData.currency}
          />
        </div>
      </Modal>
  };
}