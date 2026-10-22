"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getBlogs, resolveMediaUrl } from "@/lib/api";

const DynamicBlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const observerTargetRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        getBlogs({ limit: 100 })
            .then((data) => {
                if (isMounted && data && Array.isArray(data)) {
                    setBlogs(data);
                }
            })
            .catch((error) => console.error("Error fetching blogs:", error))
            .finally(() => {
                if (isMounted) setInitialLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, []);

    const hasMore = visibleCount < blogs.length;

    useEffect(() => {
        if (!hasMore || typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0] && entries[0].isIntersecting && !isLoadingMore) {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                        setVisibleCount((prev) => prev + 8);
                        setIsLoadingMore(false);
                    }, 300);
                }
            },
            { rootMargin: "300px" }
        );

        const currentEl = observerTargetRef.current;
        if (currentEl) observer.observe(currentEl);

        return () => {
            if (currentEl) observer.unobserve(currentEl);
        };
    }, [hasMore, isLoadingMore]);

    const visibleBlogs = blogs.slice(0, visibleCount);

    return (
        <div>
            <header className='yellow-bg' >
                <div className="container" style={{ paddingTop: "130px" }}>
                    <div className="row">
                        <div className="col-xs-12">
                            <h2 className="title" style={{color:"#333"}}>BLOG</h2> <br />
                        </div>
                    </div>
                </div>
            </header>

            <section className="blog" style={{ padding: "60px 0 90px" }}>
                <div className="container">
                    {initialLoading ? (
                        <div style={{ textAlign: "center", padding: "80px 0" }}>
                            <div style={{
                                width: "40px",
                                height: "40px",
                                border: "3px solid #fef3d6",
                                borderTopColor: "#d97706",
                                borderRadius: "50%",
                                animation: "spin 0.8s linear infinite",
                                margin: "0 auto 16px"
                            }} />
                            <p style={{ color: "#78716c", fontSize: "14px", fontWeight: "600" }}>Loading journal articles...</p>
                        </div>
                    ) : (
                        <div className="row">
                            {visibleBlogs.map((blog) => (
                                <div key={blog._id || blog.id || blog.slug} className="col-xxl-3 col-lg-3 col-sm-12 col-12" style={{ marginBottom: "30px" }}>
                                    <div className="service-container blog-container fadeInDown">
                                        <div className="service-content-wrapper">
                                            <div className="service-content-wrapper-overlay "></div>
                                            <div className="service-image blog-image">
                                                <Link href={`/blog/${blog.slug}`}>
                                                    <img
                                                        src={resolveMediaUrl(blog.featuredImage || blog.image) || '/assets/images/blogs/bl63.webp'}
                                                        alt={blog.title || blog.name}
                                                        style={{ height: "300px", width: "100%", objectFit: "cover" }}
                                                        loading="lazy"
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="service-info">
                                            <h5>{blog.title || blog.name}</h5>
                                            <Link href={`/blog/${blog.slug}`} className="link">
                                                READ MORE
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Infinite Scroll Sentinel */}
                    {hasMore && (
                        <div ref={observerTargetRef} style={{ textAlign: "center", margin: "40px 0 20px" }}>
                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 22px",
                                background: "#ffffff",
                                borderRadius: "9999px",
                                border: "1px solid rgba(245, 166, 35, 0.3)",
                                boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                                color: "#78350f",
                                fontSize: "13px",
                                fontWeight: "600"
                            }}>
                                <span style={{
                                    width: "16px",
                                    height: "16px",
                                    border: "2px solid #fef3d6",
                                    borderTopColor: "#d97706",
                                    borderRadius: "50%",
                                    animation: "spin 0.75s linear infinite",
                                    display: "inline-block"
                                }} />
                                Loading more articles...
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default DynamicBlogList;

