import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, Flex, Button, Image, useBreakpointValue } from "@chakra-ui/react";
import { CreateEventModal } from "../components/CreateEventModal";
import { UpdateEventModal } from "../components/UpdateEventModal";
import { AuthHeader } from "../components/AuthHeader";
import {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../lib/api/calendarEvent";
import { getUser } from "../lib/api/auth.js";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [events, setEvents] = useState();
  const [updateTitle, setTitle] = useState("");
  const [updateDescription, setDescription] = useState("");
  const [updateStartDate, setStartDate] = useState("");
  const [updateEndDate, setEndDate] = useState("");
  const [eventId, setEventId] = useState("");
  const navigate = useNavigate();
  const calendarHeight = useBreakpointValue({ base: "auto", md: "95vh" });
  const toolbar = useBreakpointValue({
    base: { left: "today", center: "title", right: "prev,next" },
    md: { left: "today", center: "title", right: "prev,next" },
  });

  const clearEvents = async () => {
    try {
      const res = await getCalendarEvents();
      const calendarEvents = res.data.map((calendarEvent) => {
        return {
          eventId: calendarEvent.id,
          title: calendarEvent.title,
          description: calendarEvent.description,
          start: calendarEvent.startDate,
          end: calendarEvent.endDate,
        };
      });
      setEvents(calendarEvents);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const f = async () => {
      try {
        const getUserRes = await getUser();
        if (!getUserRes?.data?.isLogin) {
          navigate("/");
          return;
        }
        await clearEvents();
      } catch (e) {
        console.log(e);
        navigate("/");
      }
    };
    f();
  }, [navigate]);

  const createEvent = async (event) => {
    await createCalendarEvent({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
    });
    await clearEvents();
  };
  const updateEvent = async (event) => {
    await updateCalendarEvent({
      calendarEventId: event.updateEventId,
      title: event.updateTitle,
      description: event.updateDescription,
      startDate: event.updateStartDate,
      endDate: event.updateEndDate,
    });
    await clearEvents();
  };

  const deleteEvent = async (calendarEventId) => {
    await deleteCalendarEvent({ calendarEventId });
    await clearEvents();
  };

  const eventClick = (info) => {
    const zeroPad = (n) => {
      return n < 10 ? "0" + n : n;
    };
    const startDatetime = info.event.start;
    const endDatetime = info.event.end ? info.event.end : startDatetime;

    const startDate = `${startDatetime.getFullYear().toString()}-${zeroPad(
      startDatetime.getMonth() + 1
    )}-${zeroPad(startDatetime.getDate())}`;

    const endDate = `${endDatetime.getFullYear().toString()}-${zeroPad(
      endDatetime.getMonth() + 1
    )}-${zeroPad(endDatetime.getDate())}`;

    setTitle(info.event.title);
    setDescription(info.event.extendedProps.description);
    setStartDate(startDate);
    setEndDate(endDate);
    setEventId(info.event.extendedProps.eventId);
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      <AuthHeader isLoggedIn={true} />
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        createEvent={createEvent}
      />
      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        updateTitle={updateTitle}
        updateDescription={updateDescription}
        updateStartDate={updateStartDate}
        updateEndDate={updateEndDate}
        updateEventId={eventId}
        setTitle={setTitle}
        setDescription={setDescription}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <Flex
        justifyContent="center"
        mt="16px"
        px={{ base: "4", md: "8" }}
        gap={{ base: "4", md: "6" }}
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          w={{ base: "100%", md: "200px" }}
          justifyContent="center"
          alignItems="center"
          flexDirection={{ base: "row", md: "column" }}
          gap={{ base: "3", md: "0" }}
        >
          <Button
            w={{ base: "auto", md: "80%" }}
            colorPalette="blue"
            onClick={() => setIsCreateModalOpen(true)}
          >
            予定を追加
          </Button>
          <Image src="calendar-view.png" maxW={{ base: "120px", md: "100%" }} />
        </Flex>
        <Box w="100%" maxW="1200px" overflowX="auto">
          <Box minW={{ base: "700px", md: "auto" }}>
            <FullCalendar
              plugins={[dayGridPlugin]}
              locale="ja"
              events={events}
              headerToolbar={toolbar}
              eventClick={eventClick}
              editable={true}
              selectable={true}
              height={calendarHeight}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Calendar;