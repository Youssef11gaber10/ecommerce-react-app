import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import GallerySlider from './Components/Home/GalleySlider/GallerySlider';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mainlayout from './Components/Layouts/Mainlayout/Mainlayout';
import Notfound from './Components/Layouts/Notfoundlayout/Notfound';
import Categories from './Components/Categories/Categories';
import Proddetails from './Components/Products/ProductDetails/Proddetails';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Brands from './Components/Brands/Brands';
import CartContextProvider from './Context/CartContext';
import Profile from './Components/Profile/Profile';
import AuthProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import Allorders from './Components/Orders/Allorders';
import Recovery from './Components/Login/Recovery';
import Wishlist from './Components/Wishlist/Wishlist';
import WishContextProvider from './Context/WishContext';
import ProductCategory from './Components/Categories/ProductCategory';
import ProductSubCategorey from './Components/Categories/ProductSubCategorey';
import ProductBrand from './Components/Brands/ProductBrand';





function App() {

  const routes = createBrowserRouter([
    {
      path: '/', element: <Mainlayout />,
      children: [
        { index: true, element: <Login /> },
        { path:"/ecommerce-react-app", element: <Home /> },

        {
          path: '/home', element:

            <ProtectedRoute>
              <WishContextProvider>
                <Home />
              </WishContextProvider>
            </ProtectedRoute>
        },
        {
          path: '/products', element:
            <ProtectedRoute>
              <WishContextProvider>
                <Products />
              </WishContextProvider>
            </ProtectedRoute>
        },
        {
          path: '/details/:id', element:
            <ProtectedRoute>
              <WishContextProvider>
                <Proddetails />
              </WishContextProvider>
            </ProtectedRoute>
        },
        {
          path: '/wishlist', element:
            <ProtectedRoute>
              <WishContextProvider>
                <Wishlist />
              </WishContextProvider>
            </ProtectedRoute>
        },
        {
          path: '/productcategory/:categoryId', element:

            <ProtectedRoute>
              <WishContextProvider>
                <ProductCategory />
              </WishContextProvider>
            </ProtectedRoute>

        },
        {
          path: '/productsubcategory/:subcategoryId', element:

            <ProtectedRoute>
              <WishContextProvider>
                <ProductSubCategorey />
              </WishContextProvider>
            </ProtectedRoute>

        },
        {
          path: '/productbrand/:brandId', element:

            <ProtectedRoute>
              <WishContextProvider>
                <ProductBrand />
              </WishContextProvider>
            </ProtectedRoute>

        },
        { path: '/cart', element: <ProtectedRoute ><Cart /> </ProtectedRoute> },
        { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: '/categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: '/brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: '/allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
        
        { path: '/account-recovery', element: <Recovery /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },

      ]
    },

    { path: '*', element: <Notfound /> }


  ])
  return (
    <>
      <AuthProvider>
        <CartContextProvider>
          <RouterProvider router={routes} />
          <ToastContainer />
        </CartContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
