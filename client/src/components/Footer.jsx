import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import { FaArrowUp } from "react-icons/fa";

export default function FooterCom() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Phong
              </span>
              Blog
            </Link>
          </div>
          <div className='hidden lg:block w-[500px] mt-5'>
          <p>[Tên trang web của bạn] là thiên đường dành cho những tín đồ yêu thích truyện chữ! Tại đây, bạn có thể đắm chìm trong kho tàng truyện khổng lồ thuộc mọi thể loại, từ những câu chuyện tình yêu lãng mạn, những cuộc phiêu lưu kỳ thú đến những trận chiến gay cấn, tất cả đều được tuyển chọn kỹ lưỡng và cập nhật liên tục.</p>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='Giới thiệu' />
              <Footer.LinkGroup col>
                {/* <Footer.Link
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  100 JS Projects
                </Footer.Link> */}
                <Footer.Link
                  href='/gioi-thieu'
            
                  rel='noopener noreferrer'
                >
                  phong Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div> */}
            <div className=' flex hover:cursor-pointer font-bold text-zinc-500' onClick={handleScrollToTop}>

             <p className='pr-1'>Đầu trang</p>   <FaArrowUp/>
           
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Phong blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='#' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

          </div>
        </div>
      </div>
    </Footer>
  );
}
