import { CodeBlock, dracula } from "react-code-blocks";


  
const BSCodeBlock = ({code, language, showLineNumbers, fontSize="inherit"}) => {
    const codeBlockStyle = {
        fontSize: fontSize,
        fontFamily: 'Consolas',
        padding: "12px",
        lineHeight: "1.25",
      };

    return (
        <CodeBlock
        customStyle={{
            height: 'auto',
            width: 'auto',
            overflow: 'scroll',
        }}
        text={code}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={dracula}
        codeBlockStyle={codeBlockStyle}
        codeContainerStyle={codeBlockStyle}
        wrapLines={true}
        />
    );
}

const inlineCodeBlockStyle = {
    display: "inline",
    fontSize: "inherit",
    fontFamily: 'Consolas',
    padding: "0px",
    lineHeight: "1"
  };

const BSInlineCodeBlock = ({code, language, showLineNumbers}) => {
    return (
        <CodeBlock
        customStyle={{
            display: "inline",
            height: 'auto',
            width: 'auto',
            overflow: 'scroll',
        }}
        text={code}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={dracula}
        codeBlockStyle={inlineCodeBlockStyle}
        codeContainerStyle={inlineCodeBlockStyle}
        wrapLines={true}
        />
    );
}
  
export { BSCodeBlock ,BSInlineCodeBlock }