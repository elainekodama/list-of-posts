import { PostComment } from "./PostComment";

export class Post {
    post_url: string;
    title: string;
    created_at: string;
    num_hugs: number;
    patient_description: string;
    assessment: string;
    question: string;
    comments: { [id: string]: PostComment }
    gender?: string;
    age?: number;

    constructor(postUrl: string, title: string, createdAt: string, numHugs: number, patientDescription: string, assessment: string, question: string, comments: any, gender: string | undefined, age: number | undefined) {
        this.post_url = postUrl;
        this.title = title;
        this.created_at = createdAt;
        this.num_hugs = numHugs;
        this.patient_description = patientDescription;
        this.assessment = assessment;
        this.question = question;
        this.comments = comments;
        this.gender = gender;
        this.age = age;
    }

    /**
     * Get user-friendly string for patient age and gender
     */
    public getPatientDescription(): string {
        if (this.gender && this.age) {
            return `${this.age} year old ${this.gender}`;
        } else {
            return "Unknown"
        }
    }

    /**
     * Create a Post form a JSON object with extracted age and gender
     * @param jsonObject Must contain all Post fields (except age and gender)
     */
    static getPostFromJson(jsonObject: any): Post {
        let age: number | undefined;
        let gender: string | undefined;
        let revisedTitle: string | undefined;
        if (jsonObject.title) {
            // Use regex expression for [XXY] where XX is a number and Y is a letter
            const regex = /\[(\d+)([A-Za-z])\]/;
            const match = jsonObject.title.match(regex);

            if (match) {
                const number = match[1];
                const letter = match[2];
                if (number as number) {
                    age = number;
                }

                if (letter.toLowerCase() === "f") {
                    gender = "female";
                } else if (letter.toLowerCase() === 'm') {
                    gender = "male";
                } else {
                    gender = "other";
                }
                // Remove patient age/gender from title
                revisedTitle = jsonObject.title.replace(/\[\d+[A-Za-z]\]\s*/, '');
            }
        }

        return new Post(
            jsonObject.post_url,
            revisedTitle ?? jsonObject.title,
            jsonObject.created_at,
            jsonObject.num_hugs,
            jsonObject.patient_description,
            jsonObject.assessment,
            jsonObject.question,
            jsonObject.comments,
            gender,
            age);
    }
}