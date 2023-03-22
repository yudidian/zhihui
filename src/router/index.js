import qs from "qs";
import {Suspense} from "react";
import {Route, useParams, useLocation, useNavigate} from "react-router-dom";
import {SpinLoading} from "antd-mobile";

const Element = (props) => {
  const {component: Component} = props
  const query = qs.parse(useLocation().search.substring(1))
  return(
      <Suspense fallback={<SpinLoading />}>
        <Component params={useParams()} query={query} navigate={useNavigate()}></Component>
      </Suspense>
  )
}

const createRouter = (routers) => {
  return (
      <>
        {
          routers.map((item, index) => {
              if (item.children && item.children.length > 0) {
                return(
                    <Route key={index} path={item.path} element={<Element component={item.component}></Element>}>
                      {createRouter(item.children)}
                    </Route>
                )
              } else {
                return <Route key={index} path={item.path} element={<Element component={item.component}></Element>}></Route>
              }
          })
        }
      </>
  )
}
export default createRouter
