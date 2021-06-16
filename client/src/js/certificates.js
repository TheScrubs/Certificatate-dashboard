export function Course(id, title, lectures, reviews, subscribers, price, subject, level ) {
    this.id = id 
    this.title = title
    this.lectures = lectures 
    this.reviews = reviews
    this.subscribers = subscribers
    this.price = price
    this.subject = subject
    this.level = level
}

export function CourseList() {
    this.all = [];
    this.addCourse = function(Certificate) {
        this.all.push(Certificate)
    }
}