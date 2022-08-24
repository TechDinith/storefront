import { Image } from "antd";
import notfoundimg from "../../../images/404.png";

const NotFound = () => {
  return <Image src={notfoundimg} preview={false}></Image>;
};

export default NotFound;
