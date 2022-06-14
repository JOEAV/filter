import {
  Table,
  Group,
  ScrollArea,
  Paper,
  createStyles,
  Title,
  Avatar,
  Text,
  MantineProvider,
  Center,
  Loader,
  Container,
} from "@mantine/core";
import { useAppSelector } from "../app/hooks";
import { selectIsLoading } from "../pages/appSlice";
const useStyles = createStyles(() => ({
  tableCell: {
    textAlign: "left",
    maxWidth: "50px",
    // margin:'-20px',
    // width:'1%',
    width: "1%",
    height: "56px",
  },
}));
export function TableComponent({ rowsData }) {
  const { classes, theme } = useStyles();
  const isLoadingData = useAppSelector(selectIsLoading);
  const calculateSeverityBadgeColor = (score) => {
    return score > 0 && score < 4
      ? "green"
      : score > 3 && score < 6
      ? "yellow"
      : score > 6 && score < 9
      ? "orange"
      : "red";
  };

  const ths = (
    <tr>
      <th>Account</th>
      <th>Title</th>
      <th>Status</th>
      <th>Severity</th>
      <th>Ticket Status</th>
    </tr>
  );
  const ticketStatusIcons = {
    backlogIcon:(  <svg
        width="17"
        height="10"
        viewBox="0 0 17 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.01884 0.714287C4.85634 0.714287 4.72461 0.84159 4.72461 0.998627V2.55302C4.72461 2.71006 4.85634 2.83736 5.01884 2.83736H12.9402C13.1027 2.83736 13.2344 2.71006 13.2344 2.55302V0.998627C13.2344 0.84159 13.1027 0.714287 12.9402 0.714287H5.01884ZM12.646 2.26868H12.4335L11.4069 1.28297H12.6394L12.646 2.26868ZM9.96519 2.26868H11.5998L10.5798 1.28297H8.94519L9.96519 2.26868ZM9.14789 2.26868H7.51327L6.50308 1.28297H8.13769L9.14789 2.26868ZM5.31308 2.26868H6.69596L5.67596 1.28297H5.31308V2.26868Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.72461 4.55C4.72461 4.39296 4.85634 4.26566 5.01884 4.26566H14.5192C14.6817 4.26566 14.8135 4.39296 14.8135 4.55V6.1044C14.8135 6.26143 14.6817 6.38874 14.5192 6.38874H5.01884C4.85634 6.38874 4.72461 6.26143 4.72461 6.1044V4.55ZM5.31308 5.82006H14.225V4.83434H5.31308V5.82006Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.909 9.65577C16.909 9.81281 16.7773 9.94011 16.6148 9.94011H5.01884C4.85634 9.94011 4.72461 9.81281 4.72461 9.65577V8.10138C4.72461 7.94434 4.85634 7.81704 5.01884 7.81704H16.6148C16.7773 7.81704 16.909 7.94434 16.909 8.10138V9.65577ZM16.3108 8.38572H5.31308V9.37143H16.3108V8.38572Z"
          fill="white"
        />
        <path
          d="M2.92668 3.64931L2.00803 4.53709V0.998627C2.00803 0.84159 1.8763 0.714287 1.7138 0.714287C1.5513 0.714287 1.41957 0.84159 1.41957 0.998627V4.53709L0.504184 3.64931C0.388267 3.53849 0.20164 3.53849 0.0857228 3.64931C-0.0285743 3.76025 -0.0285743 3.93961 0.0857228 4.05055L1.50784 5.42486C1.53558 5.45006 1.56767 5.47037 1.60265 5.48489C1.63758 5.50004 1.67552 5.50759 1.7138 5.50701C1.75314 5.50764 1.79216 5.5001 1.82822 5.48489C1.8632 5.47037 1.89529 5.45006 1.92303 5.42486L3.34188 4.05055C3.44394 3.9379 3.43812 3.76806 3.32856 3.66218C3.219 3.55631 3.04325 3.55068 2.92668 3.64931Z"
          fill="white"
        />
      </svg>),
    in_progressIcon:(  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.1333 6.39999C9.28 6.39999 8.53333 7.14666 8.53333 7.99999C8.53333 8.85333 9.28 9.59999 10.1333 9.59999C10.9867 9.59999 11.7333 8.85333 11.7333 7.99999C11.7333 7.14666 10.9867 6.39999 10.1333 6.39999ZM10.1333 6.61333C10.88 6.61333 11.52 7.25333 11.52 7.99999C11.52 8.74666 10.88 9.38666 10.1333 9.38666C9.38667 9.38666 8.74667 8.74666 8.74667 7.99999C8.74667 7.25333 9.38667 6.61333 10.1333 6.61333ZM14.4 6.39999C13.5467 6.39999 12.8 7.14666 12.8 7.99999C12.8 8.85333 13.5467 9.59999 14.4 9.59999C15.2533 9.59999 16 8.85333 16 7.99999C16 7.14666 15.2533 6.39999 14.4 6.39999ZM14.4 6.61333C15.1467 6.61333 15.7867 7.25333 15.7867 7.99999C15.7867 8.74666 15.1467 9.38666 14.4 9.38666C13.6533 9.38666 13.0133 8.74666 13.0133 7.99999C13.0133 7.25333 13.6533 6.61333 14.4 6.61333ZM3.2 7.99999C3.2 8.88333 2.48333 9.59999 1.6 9.59999C0.716667 9.59999 0 8.88333 0 7.99999C0 7.11666 0.716667 6.39999 1.6 6.39999C2.48333 6.39999 3.2 7.11666 3.2 7.99999ZM7.46667 7.99999C7.46667 8.88333 6.75 9.59999 5.86667 9.59999C4.98333 9.59999 4.26667 8.88333 4.26667 7.99999C4.26667 7.11666 4.98333 6.39999 5.86667 6.39999C6.75 6.39999 7.46667 7.11666 7.46667 7.99999Z" fill="white"/>
    </svg>),
    doneIcon:(    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16C12.4187 16 16 12.4187 16 8C16 3.58133 12.4187 0 8 0C3.58133 0 0 3.58133 0 8C0.00466667 12.416 3.584 15.9967 8 16ZM8 1.226C11.7413 1.226 14.774 4.25867 14.774 8C14.774 11.7413 11.7413 14.774 8 14.774C4.25867 14.774 1.226 11.7413 1.226 8C1.23067 4.26067 4.26133 1.22933 8 1.226Z" fill="white"/>
    <path d="M6.99925 11.486L12.0366 6.17466C12.2059 6.01933 12.2759 5.78266 12.2153 5.562C12.1566 5.34 11.9773 5.17 11.7533 5.122C11.5279 5.074 11.2959 5.15466 11.1499 5.332L7.01992 9.68533L5.42992 7.924C5.28859 7.74666 5.05992 7.66266 4.83659 7.70466C4.61459 7.748 4.43259 7.91 4.36592 8.12733C4.29925 8.34466 4.35792 8.58 4.51859 8.74133L6.99925 11.486Z" fill="white"/>
    </svg>
    )
  }



  const rows = rowsData.map((element, index) => (
    <MantineProvider
      theme={{
        colors: {
          red: ["#EC2A3F"],
          yellow: ["#f7bb00"],
          orange: ["#FF7506"],
          green: ["#21BC89"],
          backlog: ["#8FC8F3"],
          in_progress: ["#9D6DE9"],
          done: ["#5FBCA0"],
        },
      }}
    >
      <tr
        stlyes={{ boxShadow: "inset 0px -1px 0px #EBEBEB" }}
        key={`${element.Account}${element.Title}${element.score}${index}`}
      >
        <td className={classes.tableCell}>{element.Account.name}</td>
        <td className={classes.tableCell}>{element.Title}</td>
        <td className={classes.tableCell}>{element.Status}</td>
        <td className={classes.tableCell}>
          <Group>
            <Avatar
              sx={{ color: "white" }}
              radius="xl"
              src={null}
              color={calculateSeverityBadgeColor(element.Severity.score)}
            >
              {element.Severity.score}
            </Avatar>
            <Text sx={{ fontSize: "14px" }}> {element.Severity.level}</Text>
          </Group>
        </td>
        <td className={classes.tableCell}>
          {
              element.TicketStatus !== null ?
            <Group>
              <Avatar
                sx={{ color: "white" }}
                radius="xl"
                src={null}
                color={element.TicketStatus}
              >
                {ticketStatusIcons[`${element.TicketStatus}Icon`]}
              </Avatar>
              <Text sx={{ fontSize: "14px" }}> {element.TicketStatus}</Text>
            </Group> : <></>
          }
        </td>
      </tr>
    </MantineProvider>
  ));

  return isLoadingData ? (
    <Container size="md">
      <Center>
        <Loader mt={250} size="xl" variant="bars" />
      </Center>
      <Center>
        <Title order={1}>Loading...</Title>
      </Center>
    </Container>
  ) : (
    <Paper
      sx={{ boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.12)" }}
      p={"8px"}
      ml={"12px"}
      mr={"12px"}
      mt={"120px"}
    >
      <ScrollArea>
        <Table
          sx={{ borderRadius: "2px 0px 0px 2px" }}
          horizontalSpacing={"xl"}
          captionSide="top"
        >
          <Title
            sx={{ textAlign: "left" }}
            ml={"14px"}
            order={4}
          >{`${rowsData.length} Overdue Findings`}</Title>

          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
