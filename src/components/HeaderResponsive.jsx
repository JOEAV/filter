import React from "react";
import { createStyles, Header, Container, Group } from "@mantine/core";
import SeemplicityLogo from "./SeemplicityLogo";
import UserDetailsSvg from "./userDetailsSvg";

const HEADER_HEIGHT = 52;

const useStyles = createStyles(() => ({
  root: {
    position: "relative",
    zIndex: 1,
    overflowX: "hidden",
    border: "none",
  },

  header: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    backgroundColor: "black",
    minWidth: "100%",
  },
}));

export function HeaderResponsive() {
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group
          align="center"
          sx={{ minWidth: "100%", justifyContent: "space-between" }}
        >
          <SeemplicityLogo />
          <Container mr={16} sx={{ height: "20px" }}>
            <UserDetailsSvg />
          </Container>
        </Group>
      </Container>
    </Header>
  );
}
