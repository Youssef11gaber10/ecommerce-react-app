import React from 'react'

export default function Order({element:{ cartItems, id, isDelivered, isPaid, paymentMethodType, totalOrderPrice, user: { name, email, phone } },index}) {
  return (
    <div className="row d-flex justify-content-center  bg-body-tertiary my-3 ">

                    <h2 className='text-center fw-bolder py-3'>Order NUMBER :  <span className='text-main'>{index + 1}</span> </h2>

                    <div className="row  d-flex justify-content-center">

                        {cartItems.map(({ product: { title, imageCover }, price, count, _id }) => {
                            return <div key={_id} className="col-sm-12 col-md-6 col-lg-3 col-xl-2  mb-5  ">

                                <div className="layout shadow rounded-5">
                                    <img src={imageCover} className='w-100 rounded-top-5' alt="" />
                                    <p className=' fw-bolder text-center'>{title.split(' ').splice(0, 2).join(' ')}</p>
                                    <div className='text-center pb-3'>
                                        <span className='px-1 '>price :<span className='text-main  '>{price}</span></span>
                                        <span className=' px-1'>count : <span className='text-main '>{count}</span></span>
                                    </div>
                                </div>

                            </div>
                        })}

                    </div>



                    <div className="  col-sm-6   ps-5">
                        <h4 className=' text-main'>Name: <span className='text-dark'>{name}</span></h4>
                        <h4 className=' text-main'>Email: <span className='text-dark'>{email}</span></h4>
                        <h4 className=' text-main'>phone: <span className='text-dark'>{phone}</span></h4>
                    </div>



                    <div className=" col-sm-6">


                        <h4 className=''> Price: <span className='text-main'>{totalOrderPrice}</span> </h4>
                        <h4 className=''> payment method: <span className='text-main'>{paymentMethodType}</span> </h4>


                        <div>
                            <span className='px-1'>isPaid:
                                {isPaid ?
                                    <i className="fa-solid fa-circle fa-2xs px-1" style={{ color: '#1eff00' }}> paid</i> :
                                    <i className="fa-solid fa-circle fa-2xs px-1" style={{ color: '#ff0000' }}>not paid</i>
                                }

                            </span>
                            <span className='px-1'>isDeliverd:
                                {isDelivered ?
                                    <i className="fa-solid fa-circle fa-2xs px-1" style={{ color: '#1eff00' }}> deliverd</i> :
                                    <i className="fa-solid fa-circle fa-2xs px-1" style={{ color: '#ff0000' }}> not deliverd</i>
                                }
                            </span>
                        </div>
                        

                    </div>



                </div>
  )
}
