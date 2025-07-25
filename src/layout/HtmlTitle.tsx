import {Helmet, HelmetProvider} from "react-helmet-async";
import {type ReactNode} from "react";

type AppProps = {
  readonly title?: string;
}
export default function HtmlTitle({title}:AppProps):ReactNode {

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title ? `${title} - 收送文系統` : '收送文系統'}</title>
      </Helmet>
    </HelmetProvider>
  )
}

