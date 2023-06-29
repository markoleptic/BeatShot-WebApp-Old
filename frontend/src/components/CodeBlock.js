import { CodeBlock, dracula } from "react-code-blocks";


  
const BSCodeBlock = ({code, language, showLineNumbers, fontSize="inherit"}) => {
    const customStyle = {
        height: 'auto',
        width: 'auto',
        minWidth: 0,
        overflow: 'wrap',
        fontSize: fontSize,
        fontFamily: "inherit",
        padding: "0.5rem",
        lineHeight: "1.25",
        borderRadius: "0.25rem",
        //borderStyle: "solid",
    };

    let custom = dracula;
    custom.backgroundColor = "#1E1E1E"
    return (
        <div className="codeblock-container">
        <CodeBlock
        customStyle={customStyle}
        text={code}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={custom}
        /*codeBlockStyle={codeBlockStyle}
        codeContainerStyle={codeBlockStyle}*/
        wrapLines={true}
        />
        </div>
    );
}

const inlineCodeBlockStyle = {
    display: "inline",
    fontSize: "inherit",
    fontFamily: "inherit",
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