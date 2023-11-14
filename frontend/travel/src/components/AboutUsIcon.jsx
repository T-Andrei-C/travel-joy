const AboutUsIcon = ({src,content}) => {
    return(
        <div className="p-5 m-0 col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 row">
            <img height={200} src={src} alt=".."/>
            <p className="text-center"><strong>{content}</strong></p>
        </div>
    );
}

export default AboutUsIcon;