import "./Main.css";
import { Paragraph } from "../Paragraph/Paragraph";
import { Image } from "../Image/Image";

export const Main = () => {
  return (
    <main>
      <Paragraph text="lorem ipsum..."/>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png" alt="alt" width="600" height="400"/>
    </main>
  )
}