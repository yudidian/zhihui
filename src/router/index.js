import qs from "qs";
import {Suspense} from "react";
import {Routes, Route, useParams, useLocation, useNavigate} from "react-router-dom";
import FullLoading from "@/views/FullLoading";

const Element = (props) => {
  const {component: Component, meta = {}} = props
  document.title = meta.title ? meta.title : "知乎日报"
  const query = qs.parse(useLocation().search.substring(1))
  return (
      <Suspense fallback={<FullLoading/>}>
        <Component params={useParams()} query={query} navigate={useNavigate()}></Component>
      </Suspense>
  )
}

const createRouter = (routers) => {
  return (
      <Routes>
        {
          routers.map(item => {
            if (item.children && item.children.length > 0) {
              return (
                  <Route key={item.name} path={item.path}
                         element={<Element component={item.component} meta={item.meta}></Element>}>
                    {createRouter(item.children)}
                  </Route>
              )
            } else {
              return <Route key={item.name} path={item.path}
                            element={<Element component={item.component} meta={item.meta}></Element>}></Route>
            }
          })
        }
      </Routes>
  )
}

export default createRouter
