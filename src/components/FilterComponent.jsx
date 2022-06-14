import {
  Paper,
  createStyles,
  Group,
  Container,
  Text,
  Divider,
  Button,
  Menu,
  Popover,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import _ from "lodash";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../app/hooks";
import { getFilteredByFilterAsync } from "../pages/appSlice";
const useStyles = createStyles(() => ({
  root: {
    position: "relative",
    zIndex: 1,
    boxShadow: " 0px 2px 4px rgba(0, 0, 0, 0.16)",
  },

  paper: {
    alignItems: "center",
    height: "64px",
    minWidth: "100%",
    boxShadow: " 0px 2px 4px rgba(0, 0, 0, 0.16)",
    borderRadius: 0,
  },
  dummyContainer: {
    background:
      "linear-gradient(0deg, #EAEAEA, #EAEAEA), linear-gradient(0deg, #EAEAEA, #EAEAEA)",
    height: "40px",
    width: "22.5%",
    maxWidth: "324px",
    borderRadius: "14px",
    marginRight: "0px",
  },
  filterContainerLarge: {
    width: "56.8%",
    border: "1px solid rgba(65, 66, 90, 0.2)",
    height: "40px",
    borderRadius: "8px",
    marginLeft: "0px",
    marginRight: "0px",
  },
  filterContainerSmall: {
    width: "100%",
    border: "1px solid rgba(65, 66, 90, 0.2)",
    height: "40px",
    borderRadius: "8px",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "30px",


  },
  saveAsButton: {
    width: "102px",
    height: "33px",
    border: "1px solid #41425A",
    borderRadius: "17px",
    backgroundColor: "white",
  },
  saveFilterButton: {
    width: "103px",
    height: "34px",
    borderRadius: "17px",
    border: "1px solid white",
    backgroundColor: "#607AFF",
    color: "white",
  },
  chipWrapperAsButton: {
    height: "32px",
    backgroundColor: "#F0F0F3",
    border: "1px solid #FFFFFF",
    borderRadius: "0px",
    flexGrow: "0",
    justifyItems: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#607AFF",
      button: {
        color: "white",
      },
    },
  },
  chipWrapperAsText: {
    height: "32px",
    backgroundColor: "#F0F0F3",
    border: "1px solid #FFFFFF",
    borderRadius: "0px",
    flexGrow: "0",
    justifyItems: "center",
    alignItems: "center",
  },
  chipWrapperForNewValue: {
    backgroundColor: "#607AFF",
    color: "white",
    height: "32px",
    width: "104%",
    borderRadius: "0px 8px 8px 0px",
    "&:hover": {
      backgroundColor: "#607AFF",
      button: {
        color: "white",
      },
    },
    "& span": {
      marginLeft: "-10px",
      marginRight: "0",
    },
  },
}));

export function FilterComponent() {
  const isMobile = useMediaQuery("(max-width: 1440px)");
  const dispatch = useAppDispatch();
  const filterValueInputRef = useRef();
  const [filtersMenuOpened, handlers] = useDisclosure(false);
  const [filterValueToBeChoosed, setFilterValueToBeChoosed] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    Status: {
      eq: "=",
      value: "open",
      name: "Status",
    },
  });
  const { classes } = useStyles();
  useEffect(() => {
    const loadInitialFilters = async () => {
      const transformFiltersObjToArr = _.flatten(
        Object.values(selectedFilters)
      );
      if(!filterValueToBeChoosed){
        await dispatch(getFilteredByFilterAsync(transformFiltersObjToArr));
      }
      
    };
    loadInitialFilters();
  }, [selectedFilters]);
  const chipItems = (items) => {
    return items.map((val, index) => {
      const filterName =
        index % 3 === 0
          ? items[index]
          : index % 3 === 1
          ? items[index - 1]
          : items[index - 2];
        const shouldShowCloseButton = index%3 === 2
      return chipMaker(val, index, filterName,shouldShowCloseButton);
    });
  };
  const chipMaker = (text, key, filterName,shouldShowCloseButton) =>
    text === "" ? (
      <Popover
        closeOnClickOutside={false}
        key={`${key}${text}${filterName}`}
        withCloseButton
        opened={filterValueToBeChoosed}
        onClose={async () => {
          setFilterValueToBeChoosed(false);
          setSelectedFilters((prevFilters) =>
            _.omit(prevFilters, [filterName])
          );
        }}
        target={
          <Button className={classes.chipWrapperForNewValue} variant="subtle">
            Choose Value
          </Button>
        }
        width={227}
        styles={{
          close: {
            color: "white",
            top: "-36.5px",
            right: "50px",
            "&:hover": { backgroundColor: "transparent" },
          },
        }}
        position="bottom"
      >
        <Paper>
          <Stack>
            <TextInput
              ref={filterValueInputRef}
              placeholder={`Enter ${filterName} Data`}
            />
            <Button
              sx={{ backgroundColor: "#607AFF", borderRadius: "31px" }}
              onClick={async () => {
                const newFiltersState = {...selectedFilters,[filterName]:{
                    eq:'=',
                    name:filterName,
                    value:filterValueInputRef.current.value
                }}
                const transformFiltersObjToArr = _.flatten(
                  Object.values(newFiltersState)
                );
                await dispatch(
                  getFilteredByFilterAsync(transformFiltersObjToArr)
                );
                setFilterValueToBeChoosed(false)
                setSelectedFilters(newFiltersState)
              }}
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      </Popover>
    ) : (
      <Container
        key={`${key}${text}`}
        pl={12}
        pr={12}
        pt={5}
        pb={5}
        mx={"-8px"}
        className={
          text === "=" || text === "!="
            ? classes.chipWrapperAsButton
            : classes.chipWrapperAsText
        }
        onClick={async () => {
          if (text === "=" || text === "!=") {
            return setSelectedFilters({
              ...selectedFilters,
              [filterName]: {
                  name:filterName,
                value: selectedFilters[filterName].value,
                eq: text === "=" ? "!=" : "=",
              },
            });
            
          }
        }}
        sx={{
          borderRadius:
            key % 3 === 0
              ? `8px 0px 0px 8px`
              : key % 3 === 1
              ? "0px"
              : "0px 8px 8px 0px",
          flexWrap: "wrap",
        }}
      >
        <Text
          component={"button"}
          sx={{
            fontSize: "14px",
            lineHeight: "17.5px",
            color: "#41425A",
            border: "0",
            backgroundColor: "transparent",
          }}
          weight={500}
          onClick={()=>{
              if(shouldShowCloseButton){
                setSelectedFilters((prevFilters) =>
                _.omit(prevFilters, [filterName])
              );
              }
          }}
        >
          {shouldShowCloseButton ?`${text}           X` : text}
        </Text>
      </Container>
    );
  return (
    <>
      <Paper className={classes.paper}>
        <Group sx={{ width: "100%" }}>
          <Container
            mt={12}
            ml={12}
            mb={12}
            className={classes.dummyContainer}
          />
          {isMobile ? (
            <Container ml={0}>
              <button
                style={{ marginRight: "10px" }}
                className={classes.saveAsButton}
              >
                Save as
              </button>
              <button className={classes.saveFilterButton}>Save filter</button>
            </Container>
          ) : (
            <></>
          )}
          <Container
            align={"center"}
            className={
              !isMobile
                ? classes.filterContainerLarge
                : classes.filterContainerSmall
            }
          >
            <Group sx={{ height: "102.6%" }}>
              <Text mr={-8} weight={500}>
                Open Findings
              </Text>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.26923 0.209819L5.98473 5.06982L10.7322 0.209819C11.3642 -0.457682 12.4407 0.622318 11.8077 1.28982L6.42773 6.81732C6.20573 7.03932 5.79473 7.07082 5.57273 6.84882L0.192729 1.28982C-0.440271 0.622318 0.635229 -0.457682 1.26923 0.209819Z"
                  fill="#41425A"
                />
              </svg>
              <Divider ml={-4} orientation="vertical" />
              {chipItems(
                Object.keys(selectedFilters)
                  .map((key) => {
                    return [
                      key,
                      selectedFilters[key].eq,
                      selectedFilters[key].value,
                    ];
                  })
                  .flat()
              )}
              <Menu
                onOpen={handlers.open}
                onClose={handlers.close}
                control={
                  <Button
                    disabled={filterValueToBeChoosed}
                    variant={!filtersMenuOpened ? "subtle" : "filled"}
                    sx={{
                      backgroundColor: !filtersMenuOpened ? "white" : "#607AFF",
                      "&:hover": {
                        backgroundColor: !filtersMenuOpened
                          ? "white"
                          : "#607AFF",
                      },
                      height: "32px",
                    }}
                    leftIcon={
                      !filtersMenuOpened ? (
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.2222 0.500061H0.777778C0.571498 0.500061 0.373668 0.583237 0.227806 0.731292C0.0819444 0.879347 0 1.08015 0 1.28953V3.33427C0 3.74716 0.165667 4.15295 0.453445 4.44505L4.66667 8.72162V14.7106C4.66682 14.8451 4.70079 14.9773 4.76537 15.0948C4.82994 15.2122 4.92298 15.311 5.03568 15.3817C5.14837 15.4525 5.277 15.4929 5.40937 15.4991C5.54174 15.5053 5.67348 15.4771 5.79211 15.4171L8.90322 13.8382C9.16689 13.704 9.33333 13.4308 9.33333 13.1316V8.72162L13.5466 4.44505C13.8343 4.15295 14 3.74716 14 3.33427V1.28953C14 1.08015 13.9181 0.879347 13.7722 0.731292C13.6263 0.583237 13.4285 0.500061 13.2222 0.500061ZM8.00567 7.83663C7.9333 7.90981 7.87591 7.99681 7.8368 8.0926C7.79769 8.18839 7.77763 8.29109 7.77778 8.39478V12.6437L6.22222 13.4332V8.39478C6.22237 8.29109 6.20231 8.18839 6.1632 8.0926C6.12409 7.99681 6.0667 7.90981 5.99433 7.83663L1.55556 3.33427V2.07901H12.4452L12.4468 3.32874L8.00567 7.83663Z"
                            fill="#607AFF"
                          />
                        </svg>
                      ) : (
                        ""
                      )
                    }
                  >
                    {!filtersMenuOpened ? "Add Filter" : "Choose Field"}
                  </Button>
                }
              >
                <Menu.Label>Filter Types</Menu.Label>
                {[
                  "Account",
                  "Title",
                  "Status",
                  "Severity",
                  "Score",
                  "Ticket Status",
                ].map((filterType, index) => (
                  <Menu.Item
                    key={filterType}
                    onClick={() => {
                      //   setNewFilterAdded(filterType);
                      setFilterValueToBeChoosed(true);

                      setSelectedFilters((prevFilters) => ({
                        ...prevFilters,
                        [filterType]: {
                          eq: "=",
                          value: "",
                        },
                      }));
                    }}
                  >
                    {filterType}
                  </Menu.Item>
                ))}
              </Menu>
            </Group>
          </Container>
          {!isMobile ? (
            <>
              <button className={classes.saveAsButton}>Save as</button>
              <button className={classes.saveFilterButton}>Save filter</button>
            </>
          ) : (
            <></>
          )}
        </Group>
      </Paper>
    </>
  );
}
