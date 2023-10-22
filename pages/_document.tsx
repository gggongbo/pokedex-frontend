import Document, { Html, Head, Main, NextScript } from "next/document";

/* eslint-disable @next/next/no-title-in-document-head */
export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}
