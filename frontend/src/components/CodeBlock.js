import { CodeBlock, dracula } from "react-code-blocks";

const backGroundColor = "#1E1E1E";

const codeBlockStyle = {
  overflowX: "scroll",
  overflowY: "scroll",
  lineHeight: "inherit",
  width: "100%",
};

const inlineCodeBlockStyle = {
  display: "inline",
  fontSize: "inherit",
  fontFamily: "inherit",
  padding: "0px",
  lineHeight: "inherit",
};

const codeContainerStyle = {
  overflowX: "scroll",
  overflowY: "scroll",
  lineHeight: "inherit",
  width: "100%",
};

const customStyle = {
  flexshrink: 1,
  display: "flex",
  overflowX: "scroll",
  fontFamily: "inherit",
  padding: "0.25rem",
  borderRadius: "0.25rem",
  fontSize: "inherit",
  lineHeight: "inherit",
  width: "100%",
};

const theme = dracula;
theme.backgroundColor = backGroundColor;

const BSCodeBlock = ({
  code,
  language,
  showLineNumbers,
  fontSize = "inherit",
  maxHeight = "inherit",
  lineHeight = "inherit",
}) => {
  customStyle.fontSize = fontSize;
  customStyle.lineHeight = lineHeight;
  codeBlockStyle.lineHeight = lineHeight;
  codeContainerStyle.lineHeight = lineHeight;

  return (
    <div className="code-border-container">
    <div className="code-border">
      <div className="codeblock-container">
        <CodeBlock
          customStyle={customStyle}
          text={code}
          language={language || "c"}
          showLineNumbers={showLineNumbers || false}
          theme={theme}
          wrapLines={true}
          codeBlockStyle={codeBlockStyle}
          codeContainerStyle={codeContainerStyle}
        />
      </div>
    </div>
    </div>
  );
};

const BSInlineCodeBlock = ({
  code,
  language,
  showLineNumbers,
  fontSize = "inherit",
  lineHeight = "inherit",
  padding = "0rem",
  color = "inherit",
}) => {

  inlineCodeBlockStyle.lineHeight = lineHeight;

  return (
    <span className="inline inline-code">
      <CodeBlock
        customStyle={{
          display: "inline",
          overflowY: "clip",
          overflowWrap: "anywhere",
          whiteSpace: "inherit",
          fontSize: fontSize,
          lineHeight: lineHeight,
          padding: padding,
          color: color
        }}
        text={code}
        language={language || "c"}
        showLineNumbers={showLineNumbers || false}
        theme={theme}
        codeBlockStyle={inlineCodeBlockStyle}
        codeContainerStyle={inlineCodeBlockStyle}
        wrapLines={true}
      />
    </span>
  );
};

export { BSCodeBlock, BSInlineCodeBlock };
