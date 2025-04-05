import "../index.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, GridContainer, Tag } from "@trussworks/react-uswds";
import { Table } from "@nmfs-radfish/react-radfish";

export default function CruiseListPage() {
  const navigate = useNavigate();

  const handleNavNewCruise = () => {
    navigate("/cruises/new");
  };

  const handleRowClick = ({ id }) => {
    navigate(`/cruises/${id}`);
  };

  const columns = [
    {
      key: "cruiseName",
      label: "Name",
      sortable: true,
    },
    {
      key: "departurePort",
      label: "Departure Port",
      render: (row) => {
        return listValueLookup(ports, row.departurePortId);
      },
    },
    {
      key: "returnPort",
      label: "Return Port",
      render: (row) => {
        return listValueLookup(ports, row.returnPortId);
      },
    },
    {
      key: "cruiseStatus",
      label: "Status",
      render: (row) => {
        const cruiseStatus = listValueLookup(
          cruiseStatuses,
          row.cruiseStatusId,
        );
        return (
          <Tag className={`usa-tag--big ${setStatusColor(row.cruiseStatusId)}`}>
            {cruiseStatus}
          </Tag>
        );
      },
    },
    {
      key: "startDate",
      label: "Start Date",
    },
  ];

  return (
    <GridContainer className="usa-section">
      <Grid row className="flex-justify flex-align-center margin-top-2">
        <h1 className="app-sec-header">Cruise List</h1>
        <Button
          className="margin-right-0 margin-top-1"
          onClick={handleNavNewCruise}
        >
          New Cruise
        </Button>
      </Grid>
      <Grid row >
        <Table
          columns={columns}
          data={[]}
          onRowClick={handleRowClick}
          className="margin-top-5"
          bordered
          striped
        />
        {/* {!cruises?.length && <p className="width-full text-color-white text-center">No Cruises Recorded!</p>} */}
      </Grid>
    </GridContainer>
  );
};
