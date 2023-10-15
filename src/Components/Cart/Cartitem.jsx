import React from 'react'
import Loading from '../Shared/Loading/Loading'
export default function Cartitem({ element: { count, price, product }, remove, update, loading }) {

    return (


<>

{ loading?<Loading/>:
    <div className="row bg-body-tertiary shadow-sm my-4">

        <div className="col-md-5  py-3">
            <img src={product.imageCover} className='w-100 rounded-5 shadow ' height={500} alt="" />
        </div>

        <div className="col-md-4  py-3 text-center d-flex flex-column justify-content-center">
            <h3 className='fw-bolder'>{product.title.split(' ').splice(0, 3).join(' ')}</h3>
            <p className='text-main'>Price : {price} EGP</p>
            <div>

                <span onClick={() => { remove(product.id) }} className='btn  text-danger'>Remove <i className="fa-solid fa-trash" style={{ color: '#ff0000' }} />
                </span>
            </div>
        </div>


        <div className="col-md-3 pb-5 text-center d-flex  justify-content-center align-items-center ">
            <button onClick={() => { update(product.id, count + 1); }} className='mx-2 px-3 btn  text-white bg-main'>+</button>
            <span className='mx-2 px-3 '>{count}</span>
            <button onClick={() => { update(product.id, count - 1); }} className='mx-2 px-3 btn  text-white bg-main'>-</button>
        </div>

    </div>
}

</>
        

    )
}
