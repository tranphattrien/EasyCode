import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Img = ({ url, caption }) => {
  return (
    <div>
      <img src={url} alt="" />{" "}
      {caption.length ? (
        <p className="w-full text-center my-3 md:mb-2 text-base text-dark-grey">
          {caption}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

const Quote = ({ quote = "", caption = "" }) => {
  return (
    <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple">
      <p className="text-xl leading-10 md:text-2xl">
        {quote}
        {caption.length ? (
          <p className="w-full text-purple text-base">{caption}</p>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

const List = ({ style, items }) => {
  return (
    <ol
      className={`pl-5 ${style == "ordered" ? " list-decimal" : "list-disc"}`}
    >
      {items.map((listItem, i) => {
        return (
          <li
            key={i}
            className="my-4"
            dangerouslySetInnerHTML={{ __html: listItem }}
          ></li>
        );
      })}
    </ol>
  );
};
const customStyle = {
  fontSize: "1rem",
  borderRadius: "5px",
  padding: "20px"
};
const Code = ({ code }) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      customStyle={customStyle}
      style={dracula}
      showLineNumbers
      wrapLines
    >
      {code}
    </SyntaxHighlighter>
  );
};
export default function BlogContent({ block }) {
  let { type, data } = block;

  if (type == "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>;
  }

  if (type == "header") {
    if (data.level == 3) {
      return (
        <h3
          className="text-3xl font-bold"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></h3>
      );
    }
    return (
      <h2
        className="text-3xl font-bold"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></h2>
    );
  }

  if (type == "image") {
    return <Img url={data.file.url} caption={data.caption} alt="" />;
  }

  if (type == "quote") {
    return <Quote quote={data.text} caption={data.caption}></Quote>;
  }
  if (type == "list") {
    return <List style={data.style} items={data.items} />;
  }
  if (type == "code") {
    return <Code code={data.code}></Code>;
  }
}
