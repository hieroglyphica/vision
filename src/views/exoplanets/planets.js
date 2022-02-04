import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/system";
import dataSet from "../../library/exoplanetdata/exoplanet.json";
import { object } from "yup";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const filteredDataSetA = dataSet; //.slice(0, 2000);
// Object.keys(filteredDataSet).filter(object,key)=>{if(filteredDataSet[object].mass < 3) {return filter}}.map((object, key) => {
//   console.log("test", filteredDataSet[object]["# name"]);
// });
const filteredDataSet = filteredDataSetA
  .filter((i) => {
    return i.mass > 0.9 && i.mass < 1.2 && i.star_distance < 500;
  })
  .map((j) => {
    return j;
  });

export default function ExoPlanetData() {
  return (
    <TableContainer component={Paper} style={{ paddingTop: "10vh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {/* <TableCell>Dec</TableCell> */}
            <TableCell>Detection Type </TableCell>
            <TableCell>Discovered </TableCell>
            <TableCell>Mass </TableCell>
            {/* <TableCell>Planet Status </TableCell> */}
            {/* <TableCell>RA </TableCell> */}
            {/* <TableCell>Semi Major Axis</TableCell> */}
            <TableCell>Star Distance</TableCell>
            <TableCell>Star Mass</TableCell>
            <TableCell>Star Name</TableCell>
            {/* <TableCell>Updated</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDataSet.map((row) => (
            <TableRow
              key={Math.random()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {console.log("testing", row)}
              <TableCell>{row["# name"]}</TableCell>

              {/* <TableCell>{row.dec.toFixed(2)}</TableCell> */}
              <TableCell>{row.detection_type}</TableCell>
              <TableCell align="center">{row.discovered} </TableCell>
              <TableCell>{row.mass} </TableCell>
              {/* <TableCell>{row.planet_status} </TableCell> */}
              {/* <TableCell>{row.ra.toFixed(2)} </TableCell> */}
              {/* <TableCell>{row.semi_major_axis}</TableCell> */}
              <TableCell>{row.star_distance}</TableCell>
              <TableCell>{row.star_mass}</TableCell>
              <TableCell>{row.star_name}</TableCell>
              {/* <TableCell>{row.updated}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
