/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Icon } from "@material-ui/core/";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/pro-light-svg-icons'

const useStyles = makeStyles({
  tableGridColumn: {
    paddingLeft: "0px", 
    paddingRight: "0px", 
    marginLeft: "15px", 
    marginRight: "15px", 
    outline: "0.5px solid #9b9b9b !important"
  },
  table: {
    borderRadius: "2px",
    backgroundColor: ({ tableDisabled }) => {
      const backgroundColor = tableDisabled ? "#f2f2f2" : "#ffffff";
      return `${backgroundColor}`;
    },
    boxShadow:
      "0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)",
    maxHeight: 400,
    minWidth: 500,
    overflowX: "auto",
    width: "100%"
  },
  tableHeaders: {
    height: 26,
    width: 101,
    color: ({ tableDisabled }) => {
      const color = tableDisabled ? "#9b9b9b" : "#000000";
      return `${color}`;
    },
    backgroundColor: ({ tableDisabled }) => {
      const backgroundColor = tableDisabled ? "#f2f2f2" : "#ffffff";
      return `${backgroundColor}`;
    },
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    fontWeight: "bold",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: "#333333"
    }
  },
  tableCell: {
    flex: 1,
    color: ({ tableDisabled }) => {
      const color = tableDisabled ? "#9b9b9b" : "#000000";
      return `${color}`;
    },
  }
});

const StoreCapacities = props => {
  const [detail, setDetail] = useState({});
  const [tableDisabled, setTableDisabled] = useState();

  useEffect(() => {
    setTableDisabled(true);
  }, []);

  useEffect(() => {
    setDetail(props.fields);
  }, [props.fields]);

  const { register } = useForm({
    defaultValues: {
      trayCapacity: (detail && detail.trayCapacity) || "No Data Available"
    }
  });

  const rows = detail && detail.inventoryCapacities;

  const classes = useStyles({ tableDisabled });
  return (
    <div className="form-wrapper form-wrapper">
      <div className="row row-wrapper">
        <div className="col-md-6">
          <label htmlFor="trayCapacity">Tray Capacity</label>
          <input
            name="trayCapacity"
            type="text"
            placeholder="No data in system"
            ref={register}
            value={detail && detail.trayCapacity}
            disabled
          />
        </div>
        <div className="col-md-6" />
      </div>
      <div className="row row-wrapper">
        <div className={`col-md-12 ${(rows && rows.length > 0) ? classes.tableGridColumn : ""}`} >
          {rows && rows.length > 0 && (
            <TableContainer component={Paper} style={{ maxHeight: "450px" }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaders}>
                      Inventory Group
                    </TableCell>
                    <TableCell className={classes.tableHeaders} align="left">
                      Template
                    </TableCell>
                    <TableCell className={classes.tableHeaders} align="right">
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell className={classes.tableCell} align="left">
                          {row.inventoryGroup}
                          <Icon
                            className="fas fa-chevron-down"
                            style={{
                              fontSize: ".75rem",
                              paddingLeft: "10px",
                              paddingRight: "20px",
                              paddingTop: "3px",
                              color: tableDisabled ? '#9b9b9b' : '#008898',
                              cursor: 'pointer'
                            }}
                          />
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {row.template}
                          <Icon
                            className="fas fa-chevron-down"
                            style={{
                              fontSize: ".75rem",
                              paddingLeft: "10px",
                              paddingRight: "20px",
                              paddingTop: "3px",
                              color: tableDisabled ? '#9b9b9b' : '#008898',
                              cursor: 'pointer'
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <span
                            style={{
                              fontSize: "1rem",
                              paddingRight: "10px",
                              color: tableDisabled ? '#9b9b9b' : '#008898',
                              cursor: 'pointer'
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </span>
                          <span
                            style={{
                              fontSize: "1rem",
                              paddingLeft: "10px",
                              color: tableDisabled ? '#9b9b9b' : '#ec4c47',
                              cursor: 'pointer'
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
};

StoreCapacities.propTypes = {
  fields: PropTypes.any
};

export default StoreCapacities;
