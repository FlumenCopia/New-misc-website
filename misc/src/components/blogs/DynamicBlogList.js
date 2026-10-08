"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogs, resolveMediaUrl } from "@/lib/api";

const DynamicBlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        let isMounted = true;
        getBlogs({ limit: 100 })
            .then((data) => {
                if (isMounted && data && Array.isArray(data)) {
                    setBlogs(data);
                }
            })
            .catch((error) => console.error("Error fetching blogs:", error));
        return () => {
            isMounted = false;
        };
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
                            <div key={blog._id || blog.id || blog.slug} className="col-xxl-3 col-lg-3 col-sm-12 col-12">
                                <div className="service-container blog-container fadeInDown">
                                    <div className="service-content-wrapper">
                                        <div className="service-content-wrapper-overlay "></div>
                                        <div className="service-image blog-image">
                                            <Link href={`/blog/${blog.slug}`}>
                                                <img
                                                    src={resolveMediaUrl(blog.featuredImage || blog.image)}
                                                    alt={blog.title || blog.name}
                                                    style={{ height: "300px", objectFit: "cover" }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="service-info">
                                        {/* <span>{blog.date}</span> */}
                                        <h5>{blog.title || blog.name}</h5>
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

export default DynamicBlogList;

