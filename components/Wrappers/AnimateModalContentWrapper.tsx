
import {AnimatePresence, motion} from  "framer-motion"
import {ReactNode} from "react";

interface IAnimateModalContent {
    children: ReactNode
}
export const AnimateModalContentWrapper : React.FC<IAnimateModalContent> = ({children}) => {
    return <AnimatePresence>
        <motion.div
            initial={{opacity : 0, x: 10}}
            animate={{opacity : 1, x: 0}}
            exit={{opacity : 0, x: -10}}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    </AnimatePresence>
}