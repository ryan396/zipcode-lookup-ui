import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SearchHistory } from "../Types";

interface Props {
  searchHistory: SearchHistory[];
}

export default function SearchHistoryTable({ searchHistory }: Props) {
  return (
    <TableContainer sx={{ mt: 5 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Country Code</TableCell>
            <TableCell align="right">Zip Code</TableCell>
            <TableCell align="right">Results</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchHistory.map((row, i) => (
            <TableRow
              key={i + 1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i}
              </TableCell>
              <TableCell align="right">
                {row.searchCriteria.countryCode}
              </TableCell>
              <TableCell align="right">{row.searchCriteria.zipcode}</TableCell>
              <TableCell align="right">{`${row.result["place name"]}, ${row.result.state}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
