const InitialState = {
  isFetching: false,
  user: {
    firstName: "Sachin",
    lastName: "Vidya",
    preferredUserName: "sachin.vaidya45@gmail.com",
    buildInfo: "${branch}",
    fullName: "Sachin Vidya",
    sessionId: "8b52678b-fb62-4877-a904-6f2b7d0505f4",
    email: "sachin.vaidya45@gmail.com",
    username: "sachin.vaidya45@gmail.com",
  },
  userDetails: {
    message: "OK",
    users: [
      {
        userId: 71,
        username: "sachin.vaidya45@gmail.com",
        firstname: "Sachin",
        lastname: "Vaidya",
        active: true,
        currentusersessions: [],
        documentUsers: [],
        contacts: [
          {
            contactid: 33,
            user: null,
            value: "sachin.vaidya45@gmail.com",
            enabled: false,
            created: 1617148800000,
            userId: 71,
            contacttypeid: 0,
            enableLogin: false,
            contactType: { contactTypeId: 0, type: "email", contacts: [] },
          },
        ],
        userorgs: [
          {
            userorgid: 74,
            org: {
              orgId: 1,
              name: "QUALAPPS",
              county: "Sacramento",
              state: "CA",
              timezone: null,
              prefix: "QUALAPPS",
              distribution: "",
              defaultlatitude: 38.5816,
              defaultlongitude: -121.4944,
              defaultlanguage: "en",
              parentorgid: null,
              countryId: 238,
              created: null,
              restrictincidents: false,
              userorgs: [],
              orgTypes: [],
            },
            orgId: 1,
            systemrole: null,
            user: null,
            created: null,
            unit: null,
            rank: "",
            usersessions: [],
            description: "",
            jobTitle: "",
            userId: 71,
            systemroleid: 4,
            defaultLanguage: "en",
          },
        ],
        collabroompermissions: [],
      },
    ],
    count: 1,
    orgCount: 0,
    userSession: null,
  },
  incidentType: {
    message: "OK",
    incidents: [],
    incidentTypes: [
      { incidentTypeId: 17, incidentTypeName: "Aircraft Accident" },
      { incidentTypeId: 30, incidentTypeName: "Animal Infectious Diseases" },
      { incidentTypeId: 22, incidentTypeName: "Bad Weather" },
      { incidentTypeId: 7, incidentTypeName: "Blizzard" },
      { incidentTypeId: 18, incidentTypeName: "Civil Unrest" },
      { incidentTypeId: 27, incidentTypeName: "Collision or Overflow on Dams" },
      {
        incidentTypeId: 33,
        incidentTypeName:
          "Damage on Electric, Water Supply, Natural Gas, Telecommunication or Traffic Infrastructure",
      },
      {
        incidentTypeId: 28,
        incidentTypeName: "Damage on Factory Infrastructure",
      },
      { incidentTypeId: 9, incidentTypeName: "Earthquake" },
      { incidentTypeId: 5, incidentTypeName: "Fire (Structure)" },
      { incidentTypeId: 1, incidentTypeName: "Fire (Wildland)" },
      { incidentTypeId: 19, incidentTypeName: "Flood" },
      { incidentTypeId: 6, incidentTypeName: "Hazardous Materials" },
      { incidentTypeId: 32, incidentTypeName: "Human Food or Water Poisoning" },
      { incidentTypeId: 29, incidentTypeName: "Human Infectious Diseases" },
      { incidentTypeId: 8, incidentTypeName: "Hurricane" },
      {
        incidentTypeId: 21,
        incidentTypeName:
          "Ice Accumulation on Watercourses and Traffic Infrastructure",
      },
      { incidentTypeId: 20, incidentTypeName: "Landslide, Snow Avalanche" },
      { incidentTypeId: 2, incidentTypeName: "Mass Casualty" },
      { incidentTypeId: 24, incidentTypeName: "Mine Incident" },
      { incidentTypeId: 10, incidentTypeName: "Nuclear Accident" },
      { incidentTypeId: 11, incidentTypeName: "Oil Spill" },
      { incidentTypeId: 36, incidentTypeName: "Other" },
      { incidentTypeId: 12, incidentTypeName: "Planned Event" },
      {
        incidentTypeId: 13,
        incidentTypeName: "Public Health / Medical Emergency",
      },
      {
        incidentTypeId: 31,
        incidentTypeName: "Radiological, Chemical, Biological Contamination",
      },
      {
        incidentTypeId: 25,
        incidentTypeName:
          "Release or Dispersion of Harmful and Toxic Substances",
      },
      {
        incidentTypeId: 23,
        incidentTypeName: "Road, Rail, and Traffic Accidents",
      },
      { incidentTypeId: 35, incidentTypeName: "Search and Rescue" },
      { incidentTypeId: 3, incidentTypeName: "Search and Rescue" },
      { incidentTypeId: 4, incidentTypeName: "Terrorist Threat / Attack" },
      { incidentTypeId: 14, incidentTypeName: "Tornado" },
      { incidentTypeId: 15, incidentTypeName: "Tropical Storm" },
      { incidentTypeId: 16, incidentTypeName: "Tsunami" },
      { incidentTypeId: 34, incidentTypeName: "Unexploded Ordinance" },
      {
        incidentTypeId: 26,
        incidentTypeName: "Watercourse, Land and Environment Pollution",
      },
    ],
    incidentIds: [],
    incidentOrgs: null,
    owningOrg: null,
    count: 0,
  },
  incidents: {
    message: "OK",
    incidents: [
      {
        incidentid: 38,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 3226,
        incidentname: "US CA QUALAPPS test",
        incidentnumber: null,
        lat: 38.60554914643953,
        lon: -121.47478768768309,
        created: 1618643066810,
        active: true,
        folder: "",
        folderId: null,
        description: "",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 22,
            incident: null,
            incidentType: {
              incidentTypeId: 1,
              incidentTypeName: "Fire (Wildland)",
            },
            incidenttypeid: 1,
            incidentid: 38,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 37,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 3195,
        incidentname: "CA QUALAPPS FMAG Test 1",
        incidentnumber: "1345",
        lat: 38.60554914643953,
        lon: -121.47478768768309,
        created: 1618270304209,
        active: true,
        folder: "",
        folderId: null,
        description: null,
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 0,
            incident: null,
            incidentType: { incidentTypeId: 0, incidentTypeName: null },
            incidenttypeid: 0,
            incidentid: 37,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 18,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 2998,
        incidentname: "CA QUALAPPS Test13432",
        incidentnumber: "22292",
        lat: 38.66927394909598,
        lon: -121.5837497467041,
        created: 1617235340371,
        active: true,
        folder: "",
        folderId: null,
        description: null,
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 0,
            incident: null,
            incidentType: { incidentTypeId: 0, incidentTypeName: null },
            incidenttypeid: 0,
            incidentid: 37,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 16,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 2834,
        incidentname: "US CA QUALAPPS Test1212",
        incidentnumber: null,
        lat: 38.58160000000001,
        lon: -121.49439999999998,
        created: 1607838155588,
        active: true,
        folder: "",
        folderId: null,
        description: "",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 17,
            incident: null,
            incidentType: {
              incidentTypeId: 5,
              incidentTypeName: "Fire (Structure)",
            },
            incidenttypeid: 5,
            incidentid: 16,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 15,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 2539,
        incidentname: "US CA QUALAPPS Ashok's Inc",
        incidentnumber: null,
        lat: 38.58160000000001,
        lon: -121.49439999999998,
        created: 1602988760240,
        active: true,
        folder: "",
        folderId: null,
        description: "",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 16,
            incident: null,
            incidentType: {
              incidentTypeId: 1,
              incidentTypeName: "Fire (Wildland)",
            },
            incidenttypeid: 1,
            incidentid: 15,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 14,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 1125,
        incidentname: "AQ CA QUALAPPS Testing 123",
        incidentnumber: null,
        lat: 38.58160000000001,
        lon: -121.49439999999998,
        created: 1595495689399,
        active: true,
        folder: "",
        folderId: null,
        description: "Testing 123",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 15,
            incident: null,
            incidentType: {
              incidentTypeId: 1,
              incidentTypeName: "Fire (Wildland)",
            },
            incidenttypeid: 1,
            incidentid: 14,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 13,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 1124,
        incidentname: "AS CA QUALAPPS TEst23",
        incidentnumber: null,
        lat: 38.58160000000001,
        lon: -121.49439999999998,
        created: 1595495169636,
        active: true,
        folder: "",
        folderId: null,
        description: "Test",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 0,
            incident: null,
            incidentType: { incidentTypeId: 0, incidentTypeName: null },
            incidenttypeid: 0,
            incidentid: 37,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 12,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 1123,
        incidentname: "AO ca QUALAPPS emailtest",
        incidentnumber: null,
        lat: 38.77992482298669,
        lon: -121.30110212437975,
        created: 1595494435604,
        active: true,
        folder: "",
        folderId: null,
        description: "",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 14,
            incident: null,
            incidentType: {
              incidentTypeId: 1,
              incidentTypeName: "Fire (Wildland)",
            },
            incidenttypeid: 1,
            incidentid: 12,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 11,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 1122,
        incidentname: "US CA QUALAPPS Ashok",
        incidentnumber: null,
        lat: 38.58160000000001,
        lon: -121.49439999999998,
        created: 1595494028973,
        active: true,
        folder: "",
        folderId: null,
        description: "Ashok 2",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 13,
            incident: null,
            incidentType: {
              incidentTypeId: 5,
              incidentTypeName: "Fire (Structure)",
            },
            incidenttypeid: 5,
            incidentid: 11,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 10,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 1121,
        incidentname: "AL CA QUALAPPS TestEmail 1",
        incidentnumber: null,
        lat: 38.58160000000001,
        lon: -121.49439999999998,
        created: 1595493651638,
        active: true,
        folder: "",
        folderId: null,
        description: "",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 12,
            incident: null,
            incidentType: { incidentTypeId: 19, incidentTypeName: "Flood" },
            incidenttypeid: 19,
            incidentid: 10,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 9,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 1116,
        incidentname: "United States CA QUALAPPS TestEmail",
        incidentnumber: null,
        lat: 38.871402390865,
        lon: -121.12324664535544,
        created: 1595491004388,
        active: true,
        folder: "",
        folderId: null,
        description: "TestEmail",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 11,
            incident: null,
            incidentType: {
              incidentTypeId: 1,
              incidentTypeName: "Fire (Wildland)",
            },
            incidenttypeid: 1,
            incidentid: 9,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 8,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 1115,
        incidentname: "United States CA QUALAPPS",
        incidentnumber: null,
        lat: 38.871402390865,
        lon: -121.12324664535544,
        created: 1595489967182,
        active: true,
        folder: "",
        folderId: null,
        description: "",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 9,
            incident: null,
            incidentType: { incidentTypeId: 9, incidentTypeName: "Earthquake" },
            incidenttypeid: 9,
            incidentid: 8,
          },
          {
            incidentIncidenttypeid: 10,
            incident: null,
            incidentType: {
              incidentTypeId: 5,
              incidentTypeName: "Fire (Structure)",
            },
            incidenttypeid: 5,
            incidentid: 8,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 7,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 1009,
        incidentname: "United States CA QUALAPPS Test 1 - Ashok",
        incidentnumber: null,
        lat: 38.58160000000001,
        lon: -121.49439999999998,
        created: 1595257397581,
        active: true,
        folder: "",
        folderId: null,
        description: "Test 1 - Ashok",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 8,
            incident: null,
            incidentType: {
              incidentTypeId: 5,
              incidentTypeName: "Fire (Structure)",
            },
            incidenttypeid: 5,
            incidentid: 7,
          },
          {
            incidentIncidenttypeid: 7,
            incident: null,
            incidentType: {
              incidentTypeId: 1,
              incidentTypeName: "Fire (Wildland)",
            },
            incidenttypeid: 1,
            incidentid: 7,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 6,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 1007,
        incidentname: "IN TS QUALAPPS",
        incidentnumber: null,
        lat: 38.58160000000001,
        lon: -121.49439999999998,
        created: 1595031712879,
        active: true,
        folder: "",
        folderId: null,
        description: "",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 6,
            incident: null,
            incidentType: {
              incidentTypeId: 5,
              incidentTypeName: "Fire (Structure)",
            },
            incidenttypeid: 5,
            incidentid: 6,
          },
          {
            incidentIncidenttypeid: 5,
            incident: null,
            incidentType: {
              incidentTypeId: 1,
              incidentTypeName: "Fire (Wildland)",
            },
            incidenttypeid: 1,
            incidentid: 6,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 5,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 948,
        incidentname: "United States CA QUALAPPS Test - Ashok",
        incidentnumber: null,
        lat: 38.58160000000001,
        lon: -121.49439999999998,
        created: 1593996711514,
        active: true,
        folder: "",
        folderId: null,
        description: "Test - Ashok",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 4,
            incident: null,
            incidentType: {
              incidentTypeId: 5,
              incidentTypeName: "Fire (Structure)",
            },
            incidenttypeid: 5,
            incidentid: 5,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 3,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 51,
        incidentname: "org Drozen Test",
        incidentnumber: null,
        lat: 48.32378967025213,
        lon: -113.1676408167404,
        created: 1578503701145,
        active: true,
        folder: "",
        folderId: null,
        description: "",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 0,
            incident: null,
            incidentType: { incidentTypeId: 0, incidentTypeName: null },
            incidenttypeid: 0,
            incidentid: 37,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
      {
        incidentid: 1,
        parentincidentid: 0,
        usersession: null,
        usersessionid: 2,
        incidentname: "United States CA org SRINIVASAN V SANGAMESWARA",
        incidentnumber: null,
        lat: 37.96089877899054,
        lon: -77.30087906250002,
        created: 1577989641401,
        active: true,
        folder: "",
        folderId: null,
        description: "",
        bounds: null,
        workspaceid: 1,
        collabrooms: [],
        incidentIncidenttypes: [
          {
            incidentIncidenttypeid: 0,
            incident: null,
            incidentType: { incidentTypeId: 0, incidentTypeName: null },
            incidenttypeid: 0,
            incidentid: 37,
          },
        ],
        children: null,
        leaf: true,
        lastUpdate: null,
        incidentorgs: [],
      },
    ],
    incidentTypes: [],
    incidentIds: [],
    incidentOrgs: null,
    owningOrg: null,
    count: 17,
  },
  maps: {
    message: null,
    rootId: "c9702edd-b5d0-40e2-94c6-fe27d94c60ba",
    folders: [],
    datalayerfolders: [
      {
        datalayerfolderid: 7,
        datalayerid: "D99E1117-02F8-44ED-97D2-3433E7466164",
        folderid: "c9702edd-b5d0-40e2-94c6-fe27d94c60ba",
        index: 0,
        datalayer: {
          datalayerid: "D99E1117-02F8-44ED-97D2-3433E7466164",
          usersession: null,
          usersessionid: 1,
          datalayersource: {
            datalayersourceid: "9CEBB7DE-666E-4907-AB32-F4FBF824B01B",
            datasource: {
              datasourceid: "2DC0B332-C729-4E2F-AA00-1263C19361E4",
              datasourcetype: {
                datasourcetypeid: 14,
                typename: "bing",
                datasources: [],
              },
              datasourcetypeid: 14,
              internalurl: "",
              externalurl: "",
              displayname: "Bing Roads",
              username: null,
              password: null,
              active: true,
              secure: false,
              documents: [],
              datalayersources: [],
            },
            datasourceid: "2DC0B332-C729-4E2F-AA00-1263C19361E4",
            refreshrate: 0,
            stylepath: null,
            styleicon: null,
            imageformat: null,
            nativeprojection: null,
            layername: null,
            tilegridset: null,
            attributes: '{"type":"Road"}',
            tilesize: 0,
            opacity: 0.0,
            created: 1577923200000,
            usersession: null,
            usersessionid: 1,
          },
          datalayersourceid: "9CEBB7DE-666E-4907-AB32-F4FBF824B01B",
          baselayer: true,
          displayname: "Bing Roads",
          created: 1577923200000,
          legend: null,
          rootFolder: "Maps",
          collabroomDatalayers: [],
          datalayerfolders: [],
          datalayerOrgs: [],
        },
        folder: null,
      },
      {
        datalayerfolderid: 10,
        datalayerid: "70597147-934C-43C2-88ED-745631B06A4B",
        folderid: "c9702edd-b5d0-40e2-94c6-fe27d94c60ba",
        index: 1,
        datalayer: {
          datalayerid: "70597147-934C-43C2-88ED-745631B06A4B",
          usersession: null,
          usersessionid: 1,
          datalayersource: {
            datalayersourceid: "58A31356-1374-4E27-9257-72598C3CAF9F",
            datasource: {
              datasourceid: "B89C4D59-0F5F-499C-B2DA-99BE1DE70358",
              datasourcetype: {
                datasourcetypeid: 9,
                typename: "osm",
                datasources: [],
              },
              datasourcetypeid: 9,
              internalurl: "",
              externalurl: "",
              displayname: "Open Street Map",
              username: null,
              password: null,
              active: true,
              secure: false,
              documents: [],
              datalayersources: [],
            },
            datasourceid: "B89C4D59-0F5F-499C-B2DA-99BE1DE70358",
            refreshrate: 0,
            stylepath: null,
            styleicon: null,
            imageformat: null,
            nativeprojection: null,
            layername: null,
            tilegridset: null,
            attributes: "{}",
            tilesize: 0,
            opacity: 0.0,
            created: 1577923200000,
            usersession: null,
            usersessionid: 1,
          },
          datalayersourceid: "58A31356-1374-4E27-9257-72598C3CAF9F",
          baselayer: true,
          displayname: "Open Street Map",
          created: 1577923200000,
          legend: null,
          rootFolder: "Maps",
          collabroomDatalayers: [],
          datalayerfolders: [],
          datalayerOrgs: [],
        },
        folder: null,
      },
      {
        datalayerfolderid: 8,
        datalayerid: "71F2940E-7F67-4DAB-A47B-25717E66C33F",
        folderid: "c9702edd-b5d0-40e2-94c6-fe27d94c60ba",
        index: 2,
        datalayer: {
          datalayerid: "71F2940E-7F67-4DAB-A47B-25717E66C33F",
          usersession: null,
          usersessionid: 1,
          datalayersource: {
            datalayersourceid: "C4809132-61BE-4381-A53B-0DA96F292754",
            datasource: {
              datasourceid: "2DC0B332-C729-4E2F-AA00-1263C19361E4",
              datasourcetype: {
                datasourcetypeid: 14,
                typename: "bing",
                datasources: [],
              },
              datasourcetypeid: 14,
              internalurl: "",
              externalurl: "",
              displayname: "Bing Roads",
              username: null,
              password: null,
              active: true,
              secure: false,
              documents: [],
              datalayersources: [],
            },
            datasourceid: "2DC0B332-C729-4E2F-AA00-1263C19361E4",
            refreshrate: 0,
            stylepath: null,
            styleicon: null,
            imageformat: null,
            nativeprojection: null,
            layername: null,
            tilegridset: null,
            attributes: '{"type":"Aerial"}',
            tilesize: 0,
            opacity: 0.0,
            created: 1577923200000,
            usersession: null,
            usersessionid: 1,
          },
          datalayersourceid: "C4809132-61BE-4381-A53B-0DA96F292754",
          baselayer: true,
          displayname: "Bing Aerial",
          created: 1577923200000,
          legend: null,
          rootFolder: "Maps",
          collabroomDatalayers: [],
          datalayerfolders: [],
          datalayerOrgs: [],
        },
        folder: null,
      },
      {
        datalayerfolderid: 11,
        datalayerid: "1A091F5B-9DA6-4107-AE64-7DF0F27CB14B",
        folderid: "c9702edd-b5d0-40e2-94c6-fe27d94c60ba",
        index: 3,
        datalayer: {
          datalayerid: "1A091F5B-9DA6-4107-AE64-7DF0F27CB14B",
          usersession: null,
          usersessionid: 1,
          datalayersource: {
            datalayersourceid: "A5322DF7-4B68-48F4-B1ED-17DE0ECF5B1A",
            datasource: {
              datasourceid: "7F917569-1F43-4E1A-8C65-97F6161896AD",
              datasourcetype: {
                datasourcetypeid: 8,
                typename: "xyz",
                datasources: [],
              },
              datasourcetypeid: 8,
              internalurl:
                "http://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}",
              externalurl: "",
              displayname: "US Topo - 7.5 min. quadrangle maps",
              username: null,
              password: null,
              active: true,
              secure: false,
              documents: [],
              datalayersources: [],
            },
            datasourceid: "7F917569-1F43-4E1A-8C65-97F6161896AD",
            refreshrate: 0,
            stylepath: null,
            styleicon: null,
            imageformat: null,
            nativeprojection: null,
            layername: null,
            tilegridset: null,
            attributes: '{"maxZoom": 15}',
            tilesize: 0,
            opacity: 0.0,
            created: 1577923200000,
            usersession: null,
            usersessionid: 1,
          },
          datalayersourceid: "A5322DF7-4B68-48F4-B1ED-17DE0ECF5B1A",
          baselayer: true,
          displayname: "US Topo - 7.5 min. quadrangle maps",
          created: 1577923200000,
          legend: null,
          rootFolder: "Maps",
          collabroomDatalayers: [],
          datalayerfolders: [],
          datalayerOrgs: [],
        },
        folder: null,
      },
      {
        datalayerfolderid: 9,
        datalayerid: "8E21F800-9FDE-42A2-8434-8FDF0B2ECD17",
        folderid: "c9702edd-b5d0-40e2-94c6-fe27d94c60ba",
        index: 4,
        datalayer: {
          datalayerid: "8E21F800-9FDE-42A2-8434-8FDF0B2ECD17",
          usersession: null,
          usersessionid: 1,
          datalayersource: {
            datalayersourceid: "09C0D4BC-00CD-4BD0-8058-6D675DDE38F3",
            datasource: {
              datasourceid: "2DC0B332-C729-4E2F-AA00-1263C19361E4",
              datasourcetype: {
                datasourcetypeid: 14,
                typename: "bing",
                datasources: [],
              },
              datasourcetypeid: 14,
              internalurl: "",
              externalurl: "",
              displayname: "Bing Roads",
              username: null,
              password: null,
              active: true,
              secure: false,
              documents: [],
              datalayersources: [],
            },
            datasourceid: "2DC0B332-C729-4E2F-AA00-1263C19361E4",
            refreshrate: 0,
            stylepath: null,
            styleicon: null,
            imageformat: null,
            nativeprojection: null,
            layername: null,
            tilegridset: null,
            attributes: '{"type":"AerialWithLabels"}',
            tilesize: 0,
            opacity: 0.0,
            created: 1577923200000,
            usersession: null,
            usersessionid: 1,
          },
          datalayersourceid: "09C0D4BC-00CD-4BD0-8058-6D675DDE38F3",
          baselayer: true,
          displayname: "Bing Aerial With Labels",
          created: 1577923200000,
          legend: null,
          rootFolder: "Maps",
          collabroomDatalayers: [],
          datalayerfolders: [],
          datalayerOrgs: [],
        },
        folder: null,
      },
      {
        datalayerfolderid: 12,
        datalayerid: "2054EF21-DF74-4734-8E9B-893D77D246DA",
        folderid: "c9702edd-b5d0-40e2-94c6-fe27d94c60ba",
        index: 5,
        datalayer: {
          datalayerid: "2054EF21-DF74-4734-8E9B-893D77D246DA",
          usersession: null,
          usersessionid: 1,
          datalayersource: {
            datalayersourceid: "0127A876-5DA6-438B-B0D8-10B5F682B388",
            datasource: {
              datasourceid: "698CC638-57E7-4390-868D-AA3E886E052B",
              datasourcetype: {
                datasourcetypeid: 8,
                typename: "xyz",
                datasources: [],
              },
              datasourcetypeid: 8,
              internalurl:
                "http://download.iflightplanner.com/Maps/Tiles/Sectional/Z{z}/{y}/{x}.jpg",
              externalurl: "",
              displayname: "FAA - Sectional Aeronautical Charts",
              username: null,
              password: null,
              active: true,
              secure: false,
              documents: [],
              datalayersources: [],
            },
            datasourceid: "698CC638-57E7-4390-868D-AA3E886E052B",
            refreshrate: 0,
            stylepath: null,
            styleicon: null,
            imageformat: null,
            nativeprojection: null,
            layername: null,
            tilegridset: null,
            attributes: '{"maxZoom": 11}',
            tilesize: 0,
            opacity: 0.0,
            created: 1577923200000,
            usersession: null,
            usersessionid: 1,
          },
          datalayersourceid: "0127A876-5DA6-438B-B0D8-10B5F682B388",
          baselayer: true,
          displayname: "FAA - Sectional Aeronautical Charts",
          created: 1577923200000,
          legend: null,
          rootFolder: "Maps",
          collabroomDatalayers: [],
          datalayerfolders: [],
          datalayerOrgs: [],
        },
        folder: null,
      },
    ],
    incidents: [],
    count: 0,
  },
  fire: {
    message: null,
    rootId: null,
    folders: [],
    datalayerfolders: [],
    incidents: [],
    count: 0,
  },
  data: {
    message: null,
    rootId: "90e062d5-cb6f-484a-8907-ffbbf53bee7b",
    folders: [
      {
        folderid: "037f5369-e018-4551-8dc9-a2e41aa68cdf",
        foldername: "Upload",
        parentfolderid: "90e062d5-cb6f-484a-8907-ffbbf53bee7b",
        parentfolder: null,
        workspaceid: 1,
        index: 0,
        documents: [],
        children: [],
        orgfolders: [],
        datalayerfolders: [],
      },
    ],
    datalayerfolders: [],
    incidents: [],
    count: 0,
  },
  weather: {
    message: null,
    rootId: "58bd2e75-556d-4eac-881d-360639565f82",
    folders: [
      {
        folderid: "FB9ABF2F-98C0-41C3-8C16-8324E1E701B9",
        foldername: "Warnings",
        parentfolderid: "58bd2e75-556d-4eac-881d-360639565f82",
        parentfolder: null,
        workspaceid: 1,
        index: 0,
        documents: [],
        children: [],
        orgfolders: [],
        datalayerfolders: [],
      },
      {
        folderid: "E1F8E910-B773-4317-A4DF-DD6E0D50EDCD",
        foldername: "Near Real-Time Surface Analysis",
        parentfolderid: "58bd2e75-556d-4eac-881d-360639565f82",
        parentfolder: null,
        workspaceid: 1,
        index: 1,
        documents: [],
        children: [],
        orgfolders: [],
        datalayerfolders: [],
      },
      {
        folderid: "F6C59F73-5F3E-4E43-BBC4-3586A9C4DFCC",
        foldername: "Near Real-Time Observations",
        parentfolderid: "58bd2e75-556d-4eac-881d-360639565f82",
        parentfolder: null,
        workspaceid: 1,
        index: 2,
        documents: [],
        children: [],
        orgfolders: [],
        datalayerfolders: [],
      },
      {
        folderid: "BFCC7A88-6625-4731-9713-A87102DC0EA5",
        foldername: "Surface Forecasts",
        parentfolderid: "58bd2e75-556d-4eac-881d-360639565f82",
        parentfolder: null,
        workspaceid: 1,
        index: 3,
        documents: [],
        children: [],
        orgfolders: [],
        datalayerfolders: [],
      },
    ],
    datalayerfolders: [],
    incidents: [],
    count: 0,
  },
  tracking: {
    message: null,
    rootId: "0a13b845-170f-4de0-a3c6-6e4e88c28727",
    folders: [],
    datalayerfolders: [
      {
        datalayerfolderid: 305992,
        datalayerid: "03d950bb-fd58-c5ea-9770-49a50e85ee96",
        folderid: "0a13b845-170f-4de0-a3c6-6e4e88c28727",
        index: -5,
        datalayer: {
          datalayerid: "03d950bb-fd58-c5ea-9770-49a50e85ee96",
          usersession: null,
          usersessionid: 1,
          datalayersource: {
            datalayersourceid: "95ce5ca6-952a-2f34-a3a4-4863684c5dd8",
            datasource: {
              datasourceid: "2910789a-ccf2-a293-cda0-e761a0a2dd20",
              datasourcetype: {
                datasourcetypeid: 5,
                typename: "wfs",
                datasources: [],
              },
              datasourcetypeid: 5,
              internalurl: "https://dev1.scout-ca.net/geoserver/wfs",
              externalurl: null,
              displayname: "CAL FIRE CAD AVL & AFF",
              username: null,
              password: null,
              active: true,
              secure: false,
              documents: [],
              datalayersources: [],
            },
            datasourceid: "2910789a-ccf2-a293-cda0-e761a0a2dd20",
            refreshrate: 30,
            stylepath: null,
            styleicon: null,
            imageformat: null,
            nativeprojection: "EPSG:3857",
            layername: "nics:ca_calfire_view",
            tilegridset: null,
            attributes: null,
            tilesize: 0,
            opacity: 0.0,
            created: 1579737600000,
            usersession: null,
            usersessionid: 1,
          },
          datalayersourceid: "95ce5ca6-952a-2f34-a3a4-4863684c5dd8",
          baselayer: false,
          displayname: "CAL FIRE CAD AVL & AFF",
          created: 1579737600000,
          legend: null,
          rootFolder: "Tracking",
          collabroomDatalayers: [],
          datalayerfolders: [],
          datalayerOrgs: [],
        },
        folder: null,
      },
    ],
    incidents: [],
    count: 0,
  },
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;