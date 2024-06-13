import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {

  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (e) => {
    if(e.target.value === 'Thể loại') {
      return
    }
    // navigate(`/the-loai/${e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D').replace(/\s/g, '-')}`)
    navigate(`the-loai/${e.target.value}`)
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('https://story-sever.vercel.app/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    
  };

  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Truyện Chữ
        </span>
        {/* Hay */}
      </Link>
      <select onChange={(e) =>handleChange(e)} id="countries" className="hidden lg:block md:block md:w-[110px] lg:w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option defaultValue='Thể loại'>Thể loại</option>
    <option  value="Tien-Hiep">Tiên Hiệp</option>
    <option value="Kiem-Hiep">Kiếm Hiệp</option>
    <option value="Xuyen-Khong">Xuyên không</option>
    <option value="Ngon-Tinh">Ngôn Tình</option>
    <option value="Bach-Hop">Bách Hợp</option>
    <option value="Hai-Huoc">Hài Hước</option>
    <option value="Trong-Sinh">Trọng Sinh</option>
    <option value="Dam-My">Đam Mỹ</option>
    <option value="Trinh-Tham">Trinh Thám</option>
    <option value="Co-Dai">Cổ Đại</option>
    <option value="Quan-Truong">Quan Trường</option>
    <option value="Tham-Hiem">Thám Hiểm</option>
    <option value="Mat-The">Mạt Thế</option>
    <option value="Linh-Di">Linh Dị</option>
    <option value="Truyen-Teen">Truyện Teen</option>
    <option value="Phuong-Tay">Phương Tây</option>
    <option value="Khoa-Huyen">Khoa Huyễn</option>
    <option value="Huyen-Huyen">Huyền Huyễn</option>
    <option value="Cung-Dau">Cung Đấu</option>
    <option value="Light-Novel">Light Novel</option>
    <option value="Di-Gioi">Dị Giới</option>
    <option value="Nu-Cuong">Nữ Cường</option>
    <option value="Viet-Nam">Việt Nam</option>
    <option value="Di-Nang">Dị Năng</option>
    <option value="Quan-Su">Quân Sự</option>
    <option value="Lich-Su">Lịch Sử</option>
    <option value="Do-Thi">Đô Thị</option>
  </select>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Tìm kiếm...'
          rightIcon={AiOutlineSearch}
          className='md:w-full lg:w-full w-[150px]'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {/* <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button> */}
      <div className='flex gap-2 md:order-2 items-center'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Trang chủ</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/gioi-thieu'} as={'div'}>
          <Link to='/gioi-thieu'>Giới thiệu</Link>
        </Navbar.Link>
        {/* <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Thể loại</Link>  
        </Navbar.Link> */}
        <select onChange={(e) =>handleChange(e)} id="countries" className="md:hidden w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option defaultValue='Thể loại'>Thể loại</option>
    <option defaultValue='Thể loại'>Thể loại</option>
    <option  value="Tien-Hiep">Tiên Hiệp</option>
    <option value="Kiem-Hiep">Kiếm Hiệp</option>
    <option value="Xuyen-Khong">Xuyên không</option>
    <option value="Ngon-Tinh">Ngôn Tình</option>
    <option value="Bach-Hop">Bách Hợp</option>
    <option value="Hai-Huoc">Hài Hước</option>
    <option value="Trong-Sinh">Trọng Sinh</option>
    <option value="Dam-My">Đam Mỹ</option>
    <option value="Trinh-Tham">Trinh Thám</option>
    <option value="Co-Dai">Cổ Đại</option>
    <option value="Quan-Truong">Quan Trường</option>
    <option value="Tham-Hiem">Thám Hiểm</option>
    <option value="Mat-The">Mạt Thế</option>
    <option value="Linh-Di">Linh Dị</option>
    <option value="Truyen-Teen">Truyện Teen</option>
    <option value="Phuong-Tay">Phương Tây</option>
    <option value="Khoa-Huyen">Khoa Huyễn</option>
    <option value="Huyen-Huyen">Huyền Huyễn</option>
    <option value="Cung-Dau">Cung Đấu</option>
    <option value="Light-Novel">Light Novel</option>
    <option value="Di-Gioi">Dị Giới</option>
    <option value="Nu-Cuong">Nữ Cường</option>
    <option value="Viet-Nam">Việt Nam</option>
    <option value="Di-Nang">Dị Năng</option>
    <option value="Quan-Su">Quân Sự</option>
    <option value="Lich-Su">Lịch Sử</option>
    <option value="Do-Thi">Đô Thị</option>
  </select>
  <Button
          className='w-12 md:hidden h-10 mt-2'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
