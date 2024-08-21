type Props = {
  message: string;
  onModalCloseHandler: () => void;
  isActive: boolean;
};

const ErrorModal = ({ message, onModalCloseHandler, isActive }: Props) => {
  return <div>ErrorModal</div>;
};

export default ErrorModal;
