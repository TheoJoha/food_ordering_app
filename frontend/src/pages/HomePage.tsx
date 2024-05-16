import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"
const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
            <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                Get a takeaway today!
            </h1>
            <span className="text-xl">
                An order can be placed within a minute!
            </span>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img alt="landingImage" src={landingImage}/>
            <div className="flex flex-vol items-center justify-center gap-4 text-center">
                <span className="font-bold text-3xl tracking-tighter">
                    Order faster!
                </span>
                <span>
                    Download the Food-ordering app and get the best food-ordering app there is!
                </span>
                <img alt="smartphones" src={appDownloadImage} />
            </div>
        </div>
    </div>
  )
}

export default HomePage