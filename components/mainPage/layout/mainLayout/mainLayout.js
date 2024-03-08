import LatestColumn from "./latestColumn";
import MainColumn from "./mainColumn";
import IdeaColumn from "./ideaColumn";
import { Suspense } from "react";

export default function MainLayout(props) {

    return (
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
    )
}