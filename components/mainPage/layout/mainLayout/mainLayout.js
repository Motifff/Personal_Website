import LatestColumn from "./latestColumn";
import MainColumn from "./mainColumn";
import IdeaColumn from "./ideaColumn";

export default function MainLayout(props) {

    return (
        <div className="mainContent" style={{ display: "flex", flexDirection: props.ifFold ? "column" : "row", backgroundColor: "#18191B" }}>
            {
                props.ifFold ?
                    (<>
                        <LatestColumn ifFold={props.ifFold} />
                        <MainColumn ifFold={props.ifFold} ifDouble={props.if2} />
                    </>
                    )
                    :
                    (
                        <>
                            <LatestColumn ifFold={props.ifFold} />
                            <MainColumn ifFold={props.ifFold} ifDouble={props.if2} />
                            <IdeaColumn ifFold={props.ifFold} />
                        </>
                    )
            }
        </div>
    )
}