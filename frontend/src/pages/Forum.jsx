import './../styles/Forum.css'
import './../components/NavBar'
import NavBar from './../components/NavBar'
import {Button} from 'react-bootstrap';

function Forum(){
    return(
        <div className="site-container">
            <div className="content-container">
                <NavBar />
                <main>
                    <div style={{ marginTop: "0px" }}>
                            <div className="header">
                                    <h1 className="text-center mt-0 pt-5">Forum</h1>
                                    <p className="text-center">Join the Conversation</p>
                            </div>
                    </div>

                    <Button variant="primary" className="button mt-3 rightButton">New Topic</Button>

                    <div className="box7">
                        <div className="textOnTheInsideR">
                            <div>Topic</div>
                            <p>User</p>
                            <p>Replies</p>
                            <p>Views</p>
                            <p>Activity</p>
                        </div>
                    </div>
                    <div style={{ marginTop: "3vh", paddingBottom: "3vh", flex: 1 }} >
                    <div className="box6" >
                        <div className="textOnTheInsideR2">
                            <div>Sustainable Fishing Practices: What Works?</div>
                            <p>alex</p>
                            <p>5</p>
                            <p>7</p>
                            <p>15min</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Repairing and Reusing Boat Parts: Tips and Tricks</div>
                            <p>artemis</p>
                            <p>2</p>
                            <p>3</p>
                            <p>35min</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Best Boats for Sustainable Fishing</div>
                            <p>panagiotis</p>
                            <p>3</p>
                            <p>5</p>
                            <p>2hr</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Renting vs. Owning a Boat: Which is Better for You?</div>
                            <p>xarhs</p>
                            <p>0</p>
                            <p>1</p>
                            <p>7hr</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Upcycling Old Fishing Gear: Ideas and Projects</div>
                            <p>alex</p>
                            <p>1</p>
                            <p>8</p>
                            <p>1d</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Local Fisheries and the Circular Economy</div>
                            <p>eleni</p>
                            <p>10</p>
                            <p>10</p>
                            <p>1d</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Blue Economy Innovations: What’s Next?</div>
                            <p>steliosrotas</p>
                            <p>7</p>
                            <p>11</p>
                            <p>1d</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Eco-Friendly Boat Maintenance: Best Practices</div>
                            <p>vaggos</p>
                            <p>8</p>
                            <p>10</p>
                            <p>2d</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Sharing Resources in the Fishing Community</div>
                            <p>artemis</p>
                            <p>14</p>
                            <p>24</p>
                            <p>2d</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Boat Parts Marketplace: Tips for Buying and Selling</div>
                            <p>steliosrotas</p>
                            <p>7</p>
                            <p>15</p>
                            <p>2d</p>
                        </div>
                        <div className="textOnTheInsideR2">
                            <div>Waterway Conservation Efforts: How Can We Help?</div>
                            <p>eleni</p>
                            <p>7</p>
                            <p>18</p>
                            <p>2d</p>
                        </div>
                    </div> 
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Forum;