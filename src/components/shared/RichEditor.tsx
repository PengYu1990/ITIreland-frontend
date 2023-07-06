import { RichTextEditor, Link } from "@mantine/tiptap";
import { JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import { useEffect, useRef } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { Text } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient, { Response } from "../../services/http-service";
import { notifications } from "@mantine/notifications";
import AppConfig from "../../config.json";

interface Props {
  getJsonContent: (content: JSONContent) => void;
  defaultJsonContent?: string;
}
const RichEditor = ({ defaultJsonContent, getJsonContent }: Props) => {
  Image.configure({
    HTMLAttributes: {
      class: "image-class",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Image,
      // CodeBlockLowlight.configure({
      //   lowlight,
      // }),
    ],
    onUpdate({ editor }) {
      getJsonContent(editor.getJSON());
    },
  });

  const openRef = useRef<() => void>(null);

  const openDropzone = () => {
    openRef.current?.();
  };
  const addImage = (url: string) => {
    editor?.chain().focus().setImage({ src: url }).run();
  };

  const upload = (files: FileWithPath[]) => {
    uploadMutation.mutate(files[0]);
  };

  const uploadMutation = useMutation<any, AxiosError<Response<null>>, File>({
    mutationFn: (file: File) =>
      APIClient<File>("/images/post-image-upload").upload(file),
    onSuccess: (data) => {
      const url = `${AppConfig.config.contextPath}${data.url}`;
      addImage(url);
    },
    onError: (error) => {
      notifications.show({
        title: "Notification",
        message: error.response?.data.message || "Something went wrong",
        color: "red",
      });
    },
  });

  useEffect(() => {
    if (defaultJsonContent)
      editor?.commands.setContent(JSON.parse(defaultJsonContent));
  }, [defaultJsonContent]);

  return (
    <RichTextEditor editor={editor} withCodeHighlightStyles={true}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.CodeBlock />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Control
            // onClick={() => editor?.commands.insertContent("⭐")}
            onClick={openDropzone}
          >
            <AiOutlinePicture />
          </RichTextEditor.Control>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
      <Dropzone
        display="none"
        onDrop={upload}
        accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
        openRef={openRef}
        activateOnClick={false}
      >
        <Text></Text>
      </Dropzone>
    </RichTextEditor>
  );
};

export default RichEditor;
