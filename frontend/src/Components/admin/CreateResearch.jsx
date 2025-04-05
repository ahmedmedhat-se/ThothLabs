import { useState } from "react";
import "./styles/create-research.css";

const CreateResearch = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        published_date: '',
        file_url: '',
        image_url: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/create-research', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.research) {
                    window.location.href = '/news';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred: ' + error.message);
            });
    };

    return (
        <div className="create-container">
            <div className="container-fluid create-form p-4">
                <h3 className="text-center">Create a Research</h3>
                <form className="text-light" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="published_date" className="form-label">Published Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="published_date"
                            name="published_date"
                            value={formData.published_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file_url" className="form-label">File URL</label>
                        <input
                            type="url"
                            className="form-control"
                            id="file_url"
                            name="file_url"
                            value={formData.file_url}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image_url" className="form-label">Image URL</label>
                        <input
                            type="url"
                            className="form-control"
                            id="image_url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateResearch;