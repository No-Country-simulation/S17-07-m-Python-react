import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import "./libraryControls.css"

export default function LibraryControls({props}){
    return(
        <div className="libraryControls">
        <FavoriteBorderOutlinedIcon 
       /* sx={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          color:"white"
        }} */
        />

        <LibraryAddIcon 
        /*  sx={{
          position: "absolute",
          bottom: "20%",
          right: "12.5%",
          color:"white"
        }} */
        />

        <KeyboardArrowUpIcon 
       /* sx={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          color:"white"
        }} */
        />
        </div>
    )
}