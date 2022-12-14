import React, { useState } from 'react'
import { getHomeDetails, clearErrors } from "../../redux/action/homeAction"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import Carousel from "react-material-ui-carousel"
import Loading from "../utils/loader/Loading"
import { newReviewAction } from "../../redux/action/homeAction"
import { Rating } from "@material-ui/lab"
import { Dialog, DialogActions, DialogContent, Button, DialogTitle } from "@material-ui/core"
import HomeConstats from '../../redux/constants/homeConstants'
import ReviewCard from './ReviewCard'


function HomeDetails() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const { error, loading, home } = useSelector(state => state.homeDetails)
    const { success, error: reviewError } = useSelector(state => state.newReview)

    const params = useParams()
    const id = params.id
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const submitReviewHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("homeID", id)

        dispatch(newReviewAction(myForm))
        setOpen(false)
    }

    useEffect(() => {
        if (error) {
            window.alert(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            window.alert(reviewError)
            dispatch(clearErrors())
        }
        if (success) {
            window.alert("Review submitted successfully")
            dispatch({ type: HomeConstats.NEW_REVIEW_RESET })
        }
        dispatch(getHomeDetails(id))
    }, [error, dispatch, id, reviewError, success])
    return (
        <div className="homeDetails">
            {
                loading ? <Loading /> :
                    (
                        <div className="container">
                            <div className="details_card">
                                <div className='details_img'>
                                    <Carousel interval={3000}>
                                        {
                                            home.images && home.images.map((image) => (
                                                <img src={image.url} key={image._id} alt="" />
                                            ))
                                        }
                                    </Carousel>
                                    <div className="details_button">
                                        <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                                    </div>
                                    <div className='details_left'>
                                        <p>???????????? : {home && home.category}</p>
                                        <p>?????????????????? ????????? :{home && home.family ? "???????????????????????? ," : null}  {home && home.bachelor ? "???????????????????????? ," : null}
                                            {home && home.smallfamily ? "????????? ???????????????????????? ," : null}  {home && home.onlyboysStudent ? "??????????????????????????? ??????????????? ," : null}
                                            {home && home.onlygirlStudent ? "??????????????????????????? ?????????????????? ," : null} {home && home.onlymen ? "??????????????????????????? ??????????????? ," : null} {home && home.onlywomen ? "??????????????????????????? ??????????????? ," : null}
                                            {home && home.menEmployee ? "??????????????? ??????????????????????????? ," : null} {home && home.womenemployee ? "??????????????? ??????????????????????????? ," : null}</p>
                                        <p>{home && home.description}</p>
                                        <p>?????????????????? :{home && home.address}</p>

                                    </div>

                                    <Dialog
                                        aria-labelledby="simple-dialog-title"
                                        open={open}
                                        onClose={submitReviewToggle}
                                    >
                                        <DialogTitle>Submit Review</DialogTitle>
                                        <DialogContent className="submitDialog">
                                            <Rating
                                                onChange={(e) => setRating(e.target.value)}
                                                value={rating}
                                                size="large"
                                            />
                                            <textarea className="submitDialogTextArea" name="" onChange={(e) => setComment(e.target.value)} id="" cols="30" rows="5"></textarea>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button color="secondary">Cancel</Button>
                                            <Button onClick={submitReviewHandler} color="primary">Submit</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <div className='details_info'>
                                    <div>
                                        <h3> ??????????????? ????????????</h3>
                                        <p>????????????: {home && home.price}</p>
                                        <p>??????????????????: {home && home.advanced}</p>
                                    </div>
                                    <div>
                                        <h3>??????????????? ????????????</h3>
                                        <p>??????????????? : {home && String(home.date).substr(0, 10)}</p>
                                        <p>???????????????????????? : {home && home.category}</p>
                                        <p>??????????????? : {home && home.upazila}</p>
                                        <p>????????? ????????? : {home && home.totalFloor}</p>
                                        <p> ????????? ?????????: {home && home.BedRoom}</p>
                                        <p> ??????????????????????????? ?????????????????????: {home && home.flatNum}</p>
                                        <p> ?????????  ?????????????????? : {home && home.totalbathroom}</p>
                                        <p> ????????????????????? ??????????????????: {home && home.atachbathroom}</p>
                                        <p> ????????????????????????  : {home && home.velkhani}</p>
                                        <p> ?????????????????? ?????????: {home && home.drawingRoom}</p>
                                        <p> kitchen: {home && home.kitchen}</p>

                                    </div>
                                    <div>
                                        <h3>?????????????????????</h3>
                                        <p> ????????? : {home && home.name}</p>
                                        <p> ?????????????????? : {home && home.phone}</p>
                                        <p>?????????????????? : {home && home.upazila}</p>
                                        <p>Union : {home && home.union}</p>
                                    </div>
                                    {/* <h2>{home && home.category} Rent {home.upazila}</h2>
                                    <p>{home && home.address}</p>
                                   
                                   
                                     */}
                                </div>
                            </div>
                            <div className="reviews">
                                {home.reviews && home.reviews.length === 0 ? <h2>No Reviews </h2> : <h2>home Reviews </h2>}
                                <div className="review_wrapper">
                                    {
                                        home.reviews && home.reviews.map((review) => (
                                            <ReviewCard className="reviews" key={review._id} review={review} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default HomeDetails