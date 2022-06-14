const accounts = [
  { type: "AWS", name: "yoav@amazon.com" },
  { type: "WIZ", name: "yoav@wiz.com" },
  { type: "ORCA", name: "yoav@orca.com" },
  { type: "DOCKER_HUB", name: "yoav@dockerhub.com" },
];

const descriptions = [
  {
    name: "API_Key is stored in a public npm module",
    scores: {
      AWS: 4,
      WIZ: 6,
      ORCA: 5,
      DOCKER_HUB: 8,
    },
  },
  {
    name: "Latest security updates were not installed",
    scores: {
      AWS: 3,
      WIZ: 5,
      ORCA: 5,
      DOCKER_HUB: 5,
    },
  },
  {
    name: "Port 445 is open for no good reason ",
    scores: {
      AWS: 3,
      WIZ: 6,
      ORCA: 4,
      DOCKER_HUB: 6,
    },
  },
  {
    name: "Suspicious npm module has been found",
    scores: {
      AWS: 5,
      WIZ: 6,
      ORCA: 5,
      DOCKER_HUB: 2,
    },
  },
  {
    name: "API route is exposed to vulnerabilities",
    scores: {
      AWS: 4,
      WIZ: 10,
      ORCA: 7,
      DOCKER_HUB: 8,
    },
  },
  {
    name: "File server contains unkown file extension",
    scores: {
      AWS: 2,
      WIZ: 5,
      ORCA: 5,
      DOCKER_HUB: 7,
    },
  },
  {
    name: "Port 20 is open for no good reason",
    scores: {
      AWS: 4,
      WIZ: 6,
      ORCA: 5,
      DOCKER_HUB: 7,
    },
  },

  {
    name: "Uknown workstation has been joined your domain",
    scores: {
      AWS: 5,
      WIZ: 5,
      ORCA: 5,
      DOCKER_HUB: 5,
    },
  },
  {
    name: "Sql injection attempt on db XXX",
    scores: {
      AWS: 10,
      WIZ: 9,
      ORCA: 9,
      DOCKER_HUB: 8,
    },
  },

  {
    name: "User x has admin privileges for no good reasoning",
    scores: {
      AWS: 2,
      WIZ: 6,
      ORCA: 5,
      DOCKER_HUB: 4,
    },
  },
];
const ticket_status = ["backlog", "in_progress", "done", null];
const current_status = ["open", "close", "ignored"];
const calculateSeverity = (score) => {
  if (score < 4 && score > 0) {
    return "low";
  } else if (score <= 6) {
    return "medium";
  } else if (score <= 8) {
    return "high";
  } else {
    return "critical";
  }
};

export const generateFindigsData = () => {
  const findingsData = [];
  for (let i = 0; i <= 99; i++) {
    const account = accounts[Math.floor(Math.random() * accounts.length)];
    const descriptionData =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const severityData = {
      score: descriptionData.scores[account.type],
      level: calculateSeverity(descriptionData.scores[account.type]),
    };
    const ticketStatus =
      ticket_status[Math.floor(Math.random() * ticket_status.length)];
    const status =
      current_status[Math.floor(Math.random() * current_status.length )];
    findingsData.push({
      Account: account,
      Title: descriptionData.name,
      Status: status,
      Severity: severityData,
      TicketStatus: ticketStatus,
    });
  }
  return findingsData
    .sort((a, b) => a.Severity.score - b.Severity.score)
    .reverse();
};

export const mapFieldNameToValue = (findingData, fieldName) => {
  switch (fieldName) {
    case "Account":
      return findingData.Account.name;
    case "Score":
      return findingData.Severity.score;
    case "Severity":
      return findingData.Severity.level;
    case "Title":
      return findingData.Title;
    case "Status":
      return findingData.Status;
    case "TicketStatus":
      return findingData.TicketStatus;
    default:
      break;
  }
};
