export interface PaymentGatewayEventData extends MessageEvent {
  data: {
    source: string;
    operation?: string;
    isFormValid?: boolean;
    payload?: {
      info?: {
        status?: string;
      };
      data?: {
        height?: number;
        paymentData?: string;
      };
    };
  };
}

export interface PaymentGatewayState {
  formHeight?: number;
  isFormValid?: boolean;
  instrumentId?: string;
  instrumentAdded?: boolean;
}

export type PaymentGatewayListenerCallbackFunction = (
  e: PaymentGatewayEventData,
) => void;
export type PaymentGatewayStateUpdaterFn = (param: PaymentGatewayState) => void;

export interface PropTypes {
  className?: string;
  folderName: string;
  id?: string;
  iframeHeight?: number;
  locale: string;
  paymentIntentId: string;
  staticName: string;
  url: string;
}

export interface PaymentGatewayAction {
  isFormValid?: boolean;
}

export interface CreateInstrumentProps {
  elementId?: string;
}
