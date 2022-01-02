import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { loadEmptyWeather, loadWeather, toggleFavorite } from '../store/actions/weatherActions';

const columns = [
    { id: 'cityName', label: 'City', minWidth: 170, align: 'center', },
    { id: 'countryName', label: 'Country', minWidth: 170, align: 'center', },
    {
        id: 'temperature',
        label: 'Temperature',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'imgUrl',
        label: 'Icon',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'favorite',
        label: 'Favorite',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];



export default function Favorites({ history }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const favoriteLocations = useSelector(state => state.favoriteLocations)
    const currUnit = useSelector(state => state.currUnit)
    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onSelectFromFavorite = (locationKey, cityName, countryName) => {
        dispatch(loadEmptyWeather())
        history.push('/')
        dispatch(loadWeather(locationKey, cityName, countryName))
    }

    const onToggleFavorite=(ev,row)=>{
        ev.stopPropagation()
       dispatch(toggleFavorite(row))
    }

if(!favoriteLocations) return null
    return (
        <div className="page">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {favoriteLocations &&
                            <TableBody>
                                {/* {rows */}
                                {favoriteLocations?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow style={{ cursor: 'pointer' }} onClick={() => onSelectFromFavorite(row.locationKey, row.cityName, row.countryName)} hover role="checkbox" tabIndex={-1} key={row.cityName}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'cityName' && <span>{row.cityName}</span>}
                                                            {column.id === 'countryName' && <span>{row.countryName}</span>}
                                                            {column.id === 'temperature' && <span>{row.temperature[currUnit]}°</span>}
                                                            {column.id === 'imgUrl' && <img src={row.imgUrl} />}
                                                            {column.id === 'favorite' && <FavoriteIcon className='favorite-icon' onClick={(ev)=>onToggleFavorite(ev,row)} />}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        }
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={favoriteLocations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
        </div>

    );
}