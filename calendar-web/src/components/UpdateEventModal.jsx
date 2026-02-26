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

export const UpdateEventModal = ({
  isOpen,
  onClose,
  updateEvent,
  deleteEvent,
  updateTitle,
  updateEventId,
  updateDescription,
  updateStartDate,
  updateEndDate,
  setTitle,
  setDescription,
  setStartDate,
  setEndDate,
}) => {
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>イベントを更新</DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody>
          <Text fontWeight="bold">タイトル</Text>
          <Input
            placeholder="タイトル"
            value={updateTitle}
            onChange={(event) => setTitle(event.target.value)}
            mb="16px"
          />
          <Text fontWeight="bold">ディスクリプション</Text>
          <Input
            placeholder="ディスクリプション"
            value={updateDescription}
            onChange={(event) => setDescription(event.target.value)}
            mb="16px"
          />
          <Text fontWeight="bold">予定開始日付</Text>
          <Input
            value={updateStartDate}
            type="date"
            mb="16px"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Text fontWeight="bold">予定終了日付</Text>
          <Input
            value={updateEndDate}
            type="date"
            mb="16px"
            onChange={(e) => setEndDate(e.target.value)}
          />
            </DialogBody>

            <DialogFooter>
              <Button
                colorPalette="red"
                mr="8px"
                onClick={async () => {
                  await deleteEvent(updateEventId);
                  onClose();
                }}
              >
                イベントを削除
              </Button>
              <Button
                colorPalette="blue"
                onClick={() => {
                  updateEvent({
                    updateEventId,
                    updateTitle,
                    updateDescription,
                    updateStartDate,
                    updateEndDate,
                  });
                  onClose();
                }}
              >
                イベントを更新
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};