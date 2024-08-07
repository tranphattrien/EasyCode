import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { uploadImage } from "../common/upload_img";
import CodeTool from "@rxpm/editor-js-code";
const uploadImageByURL = async (e) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (err) {
      reject(err);
    }
  });

  const url = await link;
  return {
    success: 1,
    file: { url }
  };
};

const uploadImageByFile = (e) => {
  return uploadImage(e).then((url) => {
    if (url) {
      return {
        success: 1,
        file: { url }
      };
    }
  });
};
export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile
      }
    }
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading...",
      levels: [2, 3],
      defaultLevel: 2
    }
  },
  quote: { class: Quote, inlineToolbar: true },
  marker: Marker,
  inlineCode: InlineCode,
  code: {
    class: CodeTool,
    config: {
      modes: {
        js: "JavaScript",
        py: "Python",
        go: "Go",
        cpp: "C++",
        cs: "C#",
        md: "Markdown"
      },
      default: "go"
    }
  }
};
