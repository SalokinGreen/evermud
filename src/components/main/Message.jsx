import Reac, { useRef, useEffect } from "react";
import styles from "./Main.module.css";
import Image from "next/image";

export default function Message({
  message,
  setEditable,
  onContext,
  handleEditChat,
}) {
  const messageRef = useRef(null);
  useEffect(() => {
    if (message.edit) {
      messageRef.current.focus();
    }
  }, [message.edit]);
  const handleBlur = (e, message) => {
    let string = e.target.innerHTML;
    string = string.replace(/<div>/g, "\n");
    string = string.replace(/<\/div>/g, "");
    string = string.replace(/<br>/g, "\n");
    string = string.replace(/<\/br>/g, "");
    string = string.replace(/&nbsp;/g, " ");
    string = string.replace(/<p>/g, "");
    string = string.replace(/<\/p>/g, "");
    string = string.replace(/<span>/g, "");
    string = string.replace(/<\/span>/g, "");
    string = string.replace(/<br\/>/g, "");
    string = string.replace(/<br \/>/g, "");
    string = string.replace(/<br>/g, "");
    string = string.replace(/<br \/>/g, "");
    string = string.replace(/<br\/>/g, "");
    string = string.replace(/<span[^>]*>/g, "");

    setEditable(message, false);
    handleEditChat(string, message.id);
  };
  const handlePaste = (e) => {
    e.preventDefault();

    // Get pasted data
    const pastedData = (e.clipboardData || window.clipboardData).getData(
      "Text"
    );

    if (pastedData) {
      // If the pasted data is text, insert it at the cursor position
      document.execCommand("insertText", false, pastedData);
    }
  };
  return (
    <div
      className={styles.message}
      onContextMenu={(e) => onContext(e, message)}
    >
      <div className={styles.messageAvatar}>
        <Image src={message.avatar} alt={message.name} width={64} height={64} />
      </div>
      <div className={styles.messageContent}>
        <h3 className={styles.messageName}>{message.name}</h3>
        <div
          className={styles.messageText}
          contentEditable={message.edit}
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: message.text }}
          style={{ whiteSpace: "pre-line" }}
          onBlur={(e) => {
            handleBlur(e, message);
          }}
          onPaste={(e) => handlePaste(e)}
          ref={messageRef}
        ></div>
      </div>
    </div>
  );
}
