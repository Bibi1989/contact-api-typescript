export interface Mongo {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
}

export interface Contact {
    firstname: String;
    lastname: String;
    email: String;
    phone: String;
    website?: String;
    date?: Date;
}