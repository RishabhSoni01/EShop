import { InputBase, Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchedProducts } from '../../../redux/userHandle';

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        dispatch(getSearchedProducts("searchProduct", searchTerm));

        if (location.pathname !== "/ProductSearch") {
            navigate("/ProductSearch");
        }
    };

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands, and more"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <SearchIconWrapper>
                <SearchIcon sx={{ color: "#4d1c9c" }} />
            </SearchIconWrapper>
        </SearchContainer>
    );
};

const SearchContainer = styled(Box)`
  border-radius: 4px;
  margin-left: 10px;
  width: 38%;
  background-color: #f8f8f8; /* Light grey background */
  display: flex;
  &:hover {
    background-color: #fff; /* White background on hover */
  }
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: #4d1c9c; /* Updated color for consistency */
`;

const InputSearchBase = styled(InputBase)`
  font-size: 14px; /* Adjusted font size for better readability */
  width: 100%;
  padding-left: 20px;
  color: #333; /* Dark grey text color */
`;

export default Search;