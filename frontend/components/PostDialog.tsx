/**
 * PostDialog Component
 * 
 * A modal dialog component for creating new posts with text and image upload capabilities.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.setOpen - Function to control dialog visibility
 * @param {boolean} props.open - Current dialog visibility state
 * @param {string} props.src - URL of the user's profile photo
 * @param {string} props.fullName - User's full name
 */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Textarea } from "./ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";
import { postsApi } from "@/lib/api";
import { toast } from "react-toastify";

// Type definition for component props
interface PostDialogProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  src: string;
  fullName: string;
}

export function PostDialog({ setOpen, open, src, fullName }: PostDialogProps) {
  // Refs and state management
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  // Handlers for text input changes
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  // Handlers for file upload
  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setSelectedFile(dataUrl);
    }
  };

  // Handlers for form submission
  const postActionHandler = async (formData: FormData) => {
    const inputText = formData.get("inputText") as string;
    try {
<<<<<<< Updated upstream
      await createPost(inputText, selectedFile);
=======
      if (!user?.id) {
        toast.error("User not authenticated");
        return;
      }
      await postsApi.create({
        post_text: inputText,
        user_id: user.id,
        picture_link: selectedFile || undefined
      });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      toast.success("Post Created Successfully");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Something went Wrong");
    }
    setInputText("");
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="sm:max-w-[424px]"
      >
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <ProfilePhoto src={src} />
            <div>
              <h1>{fullName}</h1>
              <p className="text-xs">Post to anyone</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form
          action={(formData) => {
            postActionHandler(formData);
          }}
        >
          <div className="flex flex-col ">
            <Textarea
              id="name"
              name="inputText"
              value={inputText}
              onChange={changeHandler}
              className="border-none text-md focus-visible:ring-0"
              placeholder="Type your message here."
            />
            <div className="my-4">
              {selectedFile && (
                <Image
                  src={selectedFile}
                  alt="preview-image"
                  width={400}
                  height={400}
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                onChange={fileChangeHandler}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
              <Button type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>
        <Button
          className="gap-2"
          onClick={() => inputRef?.current?.click()}
          variant={"ghost"}
        >
          <Images className="text-blue-500" />
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
