"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const DynamicBlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("https://miscarchive.com//api/blogs/")
            .then((response) => response.json())
            .then((data) => setBlogs(data))
            .catch((error) => console.error("Error fetching blogs:", error));
    }, []);

    return (
        <div>
            <header className='yellow-bg' >
                <div className="container" style={{ paddingTop: "130px" }}>
                    <div className="row">
                        <div className="col-xs-12">
                            <h2 className="title" style={{color:"#333"}}>BLOG</h2> <br />
                            {/* <h5 className="sub-title">Digital experiences are continually</h5> */}
                        </div>
                    </div>
                </div>
            </header>

            <section className="blog">
                <div className="container">
                    <div className="row">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="col-xxl-3 col-lg-3 col-sm-12 col-12">
                                <div className="service-container blog-container fadeInDown">
                                    <div className="service-content-wrapper">
                                        <div className="service-content-wrapper-overlay "></div>
                                        <div className="service-image blog-image">
                                            <Link href={`/blog/${blog.slug}`}>
                                                <img
                                                    src={blog.image}
                                                    alt={blog.name}
                                                    style={{ height: "300px", objectFit: "cover" }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="service-info">
                                        {/* <span>{post.date}</span> */}
                                        <h5>{blog.name}</h5>
                                        <Link href={`/blog/${blog.slug}`} className="link">
                                            READ MORE
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    )
}

export default DynamicBlogList
