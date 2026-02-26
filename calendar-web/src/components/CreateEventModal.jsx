import { useState } from "react";
import {
  DialogRoot,
  Portal,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
  DialogCloseTrigger,
  DialogTitle,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";

export const CreateEventModal = ({ isOpen, onClose, createEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const clearEvent = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
      placement="center"
    >
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent w="calc(100% - 2rem)" maxW="500px" mx="4">
            <DialogHeader>
              <DialogTitle>イベントを追加</DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody>
          <Text fontWeight="bold">タイトル</Text>
          <Input
            placeholder="タイトル"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            mb="16px"
          />
          <Text fontWeight="bold">ディスクリプション</Text>
          <Input
            placeholder="ディスクリプション"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            mb="16px"
          />
          <Text fontWeight="bold">予定開始日付</Text>
          <Input
            value={startDate}
            type="date"
            mb="16px"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Text fontWeight="bold">予定終了日付</Text>
          <Input
            value={endDate}
            type="date"
            mb="16px"
            onChange={(e) => setEndDate(e.target.value)}
          />
            </DialogBody>

            <DialogFooter justifyContent={{ base: "stretch", md: "flex-end" }}>
              <Button
                w={{ base: "100%", md: "auto" }}
                colorPalette="blue"
                onClick={() => {
                  createEvent({ title, description, startDate, endDate });
                  clearEvent();
                  onClose();
                }}
              >
                イベントを追加
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};